package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"homework-tango222/servers/gateway/models/users"
	"homework-tango222/servers/gateway/sessions"
	"io"
	"net/http"
	"strconv"
	"strings"
	"time"
)

//TODO: define HTTP handler functions as described in the
//assignment description. Remember to use your handler context
//struct as the receiver on these functions so that you have
//access to things like the session store and user store.

//UsersHandler is a Handler function for Users
func (ctx *Context) UsersHandler(w http.ResponseWriter, r *http.Request) {
	//handles POST Requests
	if r.Method == http.MethodPost {
		if r.Header.Get("Content-Type") != "application/json" {
			fmt.Println("HTTP Response Status:", http.StatusUnsupportedMediaType, " Request Body must be in Json")
			w.WriteHeader(http.StatusUnsupportedMediaType)
			return
		}

		//The request body should contain JSON that can be decoded into the users.NewUser struct. Ensure the
		//data is valid and create a new user account in the database.
		nu := &users.NewUser{}
		if err := DecodeIntoStruct(r.Body, nu); err != nil {
			fmt.Println(err)
			return
		}

		u, err := nu.ToUser()
		if err != nil {
			fmt.Println(err)
			return
		}
		user, err := ctx.UsersStore.Insert(u)
		if err != nil {
			fmt.Printf("HTTP Response Status: %v Error inserting user into database. \nError: %v", http.StatusBadRequest, err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		
		//Begin a New Session for the User
		state := &SessionState{
			SessionBegin: time.Now(),
			AuthUser:     user,
		}
		id, err := sessions.BeginSession(ctx.Key, ctx.SessionsStore, state, w)
		if err != nil {
			fmt.Printf("Error Beginning Session. Error:%v", err)
			return
		}

		fmt.Println("Session Started...")
		fmt.Println("SessionID: ", id)

		//Respond to the client
		fmt.Println("HTTP Response Status: ", http.StatusCreated)
		w.WriteHeader(http.StatusCreated)
		w.Header().Set("Content-Type", "application/json")
		if err := EncodeStructIntoJSON(w, user); err != nil {
			fmt.Println(err)
			return
		}
	} else {
		//if any other req Method
		fmt.Println("HTTP Response Status: ", http.StatusMethodNotAllowed)
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

//SpecificUserHandler is a handler function for specific users
func (ctx *Context) SpecificUserHandler(w http.ResponseWriter, r *http.Request) {
	urlVal := r.URL.String()
	splits := strings.Split(urlVal, "/users/")
	userID := splits[1]
	fmt.Println(userID)

	//assuming the body contains user info
	if r.Method == http.MethodGet {
		if userID == "me" {
			user := &users.User{}
			if err := DecodeIntoStruct(r.Body, user); err != nil {
				fmt.Println(err)
				return
			}
		}
		uID, _ := strconv.Atoi(userID)
		id := int64(uID)

		u, err := ctx.UsersStore.GetByID(id)
		if err != nil {
			fmt.Println("HTTP Response Status: ", http.StatusNotFound, " No user ID found")
			fmt.Printf("error: %v", err)
			w.WriteHeader(http.StatusNotFound)
			return
		}
		fmt.Println("HTTP Response Status: ", http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		enc := json.NewEncoder(w)
		enc.Encode(u)

	} else if r.Method == http.MethodPatch {
		if userID != "me" /* auth user? */ {
			fmt.Println("HTTP Response Status: ", http.StatusForbidden)
			w.WriteHeader(http.StatusForbidden)
			return
		}
		if r.Header.Get("Content-Type") != "application/json" {
			fmt.Println("HTTP Response Status:", http.StatusUnsupportedMediaType, " Request Body must be in Json")
			w.WriteHeader(http.StatusUnsupportedMediaType)
			return
		}
		uID, _ := strconv.Atoi(userID)
		id := int64(uID)
		updates := &users.Updates{}
		if err := DecodeIntoStruct(r.Body, updates); err != nil {
			fmt.Println(err)
			return
		}
		u, err := ctx.UsersStore.GetByID(id)
		if err != nil {
			fmt.Println(err)
		}
		us, err := ctx.UsersStore.Update(id, updates)
		if err != nil {
			fmt.Println(err)
			return
		}
		ctx.Trie.Add(us.FirstName, us.ID)
		ctx.Trie.Add(us.LastName, us.ID)
		if err := EncodeStructIntoJSON(w, u); err != nil {
			fmt.Println(err)
			return
		}
	} else {
		//if any other req Method
		fmt.Println("HTTP Response Status: ", http.StatusMethodNotAllowed)
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

}

//SessionsHandler is a handler for Sessions
func (ctx *Context) SessionsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		if r.Header.Get("Content-Type") != "application/json" {
			fmt.Println("HTTP Response Status:", http.StatusUnsupportedMediaType, " Request Body must be in Json")
			w.WriteHeader(http.StatusUnsupportedMediaType)
			return
		}
		cred := &users.Credentials{}
		if err := DecodeIntoStruct(r.Body, cred); err != nil {
			fmt.Println(err)
			return
		}
		//authenticate user?
		user, err := ctx.UsersStore.GetByEmail(cred.Email)
		if err != nil {
			fmt.Println(err)
			return
		}
		if err := user.Authenticate(cred.Password); err != nil {
			fmt.Println("HTTP Response Status: ", http.StatusUnauthorized, " Entered Invalid Credentials")
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		state := &SessionState{
			SessionBegin: time.Now(),
			AuthUser:     user,
		}
		sid, err := sessions.BeginSession(ctx.Key, ctx.SessionsStore, state, w)
		if err != nil {
			fmt.Println("Error Beginning Session: error: ", err)
			return
		}
		fmt.Println("Session Started...")
		fmt.Println("SessionID: ", sid)
		fmt.Println("HTTP Response Status: ", http.StatusCreated)
		w.WriteHeader(http.StatusCreated)
		w.Header().Set("Content-Type", "application/json")
		if err := EncodeStructIntoJSON(w, user); err != nil {
			fmt.Println(err)
			return
		}
	} else {
		fmt.Println("HTTP Response Status: ", http.StatusMethodNotAllowed)
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

//SpecificSessionHandler is a handler for specific session
func (ctx *Context) SpecificSessionHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodDelete {
		urlValue := r.URL.String()
		splits := strings.Split(urlValue, "/sessions/")
		if splits[1] != "mine" {
			fmt.Println("HTTP Response Status: ", http.StatusForbidden, " Error: Resource Path Incorrect")
			fmt.Printf("Expected: \nmine \nActual: \n%s", splits[1])
			w.WriteHeader(http.StatusForbidden)
			return
		}
		if _, err := sessions.EndSession(r, ctx.Key, ctx.SessionsStore); err != nil {
			fmt.Println(err)
			return
		}
		w.Write([]byte("Signed Out"))
	} else {
		fmt.Println("HTTP Response Status: ", http.StatusMethodNotAllowed)
		return
	}
}

//DecodeIntoStruct decodes json from io.Reader into struct
func DecodeIntoStruct(r io.Reader, stru interface{}) error {
	b := StreamToByte(r)
	return json.Unmarshal(b, stru)
}

//EncodeStructIntoJSON encodes structs into JSON written to io.Writer
func EncodeStructIntoJSON(w io.Writer, stru interface{}) error {
	b, err := json.Marshal(stru)
	if err != nil {
		return fmt.Errorf("Error marshaling struct into JSON... \nError:%v", err)
	} else if b == nil {
		return fmt.Errorf("Nil Pointer! Nil Error but b == <nil>")
	}
	w.Write(b)
	return nil
}

//StreamToByte converts an io.Reader to a byte object
func StreamToByte(stream io.Reader) []byte {
	buf := new(bytes.Buffer)
	buf.ReadFrom(stream)
	return buf.Bytes()
}
