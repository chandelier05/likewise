package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	"time"

	"../servers/gateway/handlers"
	"../servers/gateway/indexes"
	"../servers/gateway/models/users"
	"../servers/gateway/sessions"

	"github.com/go-redis/redis"
	_ "github.com/go-sql-driver/mysql"
)

//main is the main entry point for the server
func main() {
	/* TODO: add code to do the following
	- Read the ADDR environment variable to get the address
	  the server should listen on. If empty, default to ":80"
	- Create a new mux for the web server.
	*/
	//read ADDR env var
	addr := os.Getenv("ADDR")

	//set server to listen on port 443
	if len(addr) == 0 {
		addr = ":443"
	}

	tlsKeyPath := os.Getenv("TLSKEY")
	tlsCertPath := os.Getenv("TLSCERT")
	sessionsKey := os.Getenv("SESSIONKEY")
	redisAddr := os.Getenv("REDISADDR")
	dsn := os.Getenv("DSN")

	//for local testing
	//if len(tlsKeyPath) == 0 {
	//	tlsKeyPath = "./privkey.pem"
	//}
	//if len(tlsCertPath) == 0 {
	//		tlsCertPath = "./fullchain.pem"
	//	}

	//create a new redis client
	rdb := redis.NewClient(&redis.Options{
		Addr:     redisAddr, // use default Addr
		Password: "",        // no password set
		DB:       0,         // use default DB
	})

	//open sql db
	if len(dsn) == 0 {
		// provide a default dsn
		// root:password@tcp(mysqldemo:3306)/default_db_name
		dsn = "insert-dsn-when-made-later"
	}
	sqlDB, err := sql.Open("mysql", dsn)
	log.Println("dsn:", dsn)

	if err != nil {
		log.Printf("Error opening sql database... \nError: %v", err)
	} else {
		sqlstore := users.NewSqlStore(sqlDB)
		trie := indexes.NewTrie()
		//add all current users in sqlstore to trie
		sqlstore.AddToTrie(trie)
		ctx := handlers.NewContext(sessionsKey, sessions.NewRedisStore(rdb, time.Hour),sqlstore, trie)

		theMux := http.NewServeMux()

		theMux.HandleFunc("/v1/summary", handlers.SummaryHandler)

		theMux.HandleFunc("/v1/users", ctx.UsersHandler)
		theMux.HandleFunc("/v1/users/", ctx.SpecificUserHandler)
		theMux.HandleFunc("/v1/sessions", ctx.SessionsHandler)
		theMux.HandleFunc("/v1/sessions/", ctx.SpecificSessionHandler)

		wrappedMux := &handlers.CORS{
			Handler: theMux}

		/*
			- Start a web server listening on the address you read from
			the environment variable, using the mux you created as
			the root handler. Use log.Fatal() to report any errors
			that occur when trying to start the web server.
		*/
		log.Printf("server is listening on port %s", addr)
		log.Fatal(http.ListenAndServeTLS(addr, tlsCertPath, tlsKeyPath, wrappedMux))
	}

}
