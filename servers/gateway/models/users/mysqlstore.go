package users

import (
	"database/sql"
	"fmt"
	"homework-tango222/servers/gateway/indexes"
	"strings"
)

const sqlColumnListNoID = "email,first_name,last_name,pass_hash,user_name,photo_url"
const sqlInsertUser = "insert into users(" + sqlColumnListNoID + ") values(?,?,?,?,?,?)"

const sqlUpdateUser = "update users set first_name= ?,last_name= ? where id= ?"

const sqlDeleteUser = "delete from users where id=?"

const sqlByID = "select id," + sqlColumnListNoID + " from users where id=?"
const sqlByEmail = "select id," + sqlColumnListNoID + " from users where email=?"
const sqlByUsername = "select id," + sqlColumnListNoID + " from users where user_name=?"
const sqlGetAll = "select id, user_name, last_name, first_name from users"

//SqlStore is a database that stores stuff
type SqlStore struct {
	db *sql.DB
}

//NewSqlStore is a function that initializes a NewSqlStore
func NewSqlStore(db *sql.DB) *SqlStore {
	if db == nil {
		panic("nil database pointer passed to NewSqlStore")
	}
	return &SqlStore{
		db: db,
	}
}

//AddToTrie adds all Users from users database to trie
func (s *SqlStore) AddToTrie(tr *indexes.Trie) error {
	rows, err := s.db.Query(sqlGetAll)
	defer rows.Close()

	if err != nil {
		return fmt.Errorf("error retrieving all rows from users database \n%v", err)
	}

	user := &User{}
	for rows.Next() {
		if err := rows.Scan(
			&user.ID, &user.UserName, &user.LastName, &user.FirstName); err != nil {
			return fmt.Errorf("error scanning row: \n%v", err)
		}

		tr.Add(user.UserName, user.ID)
		usersplits := strings.Split(user.UserName, " ")
		for _, u := range usersplits{
			tr.Add(u, user.ID)
		}
		tr.Add(user.FirstName, user.ID)
		firstsplits := strings.Split(user.FirstName, " ")
		for _, f := range firstsplits{
			tr.Add(f, user.ID)
		}
		tr.Add(user.LastName, user.ID)
		lastsplits := strings.Split(user.LastName, " ")
		for _, l := range lastsplits{
			tr.Add(l, user.ID)
		}
	}

	//if we got an error fetching the next row, report it
	if err := rows.Err(); err != nil {
		return fmt.Errorf("error getting next row: \n%v", err)
	}
	return nil
}

//GetByID returns the User with the given ID
func (s *SqlStore) GetByID(id int64) (*User, error) {
	rows, err := s.db.Query(sqlByID, id)
	defer rows.Close()

	if err != nil {
		return nil, fmt.Errorf("error retrieving by id: \n%v", err)
	}

	user := &User{}
	for rows.Next() {
		if err := rows.Scan(&user.ID, &user.Email,
			&user.FirstName, &user.LastName, &user.PassHash, &user.UserName, &user.PhotoURL); err != nil {
			return nil, fmt.Errorf("error scanning row: \n%v", err)
		}
	}

	//if we got an error fetching the next row, report it
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error getting next row: \n%v", err)
	}
	return user, nil
}

//GetByEmail returns the User with the given email
func (s *SqlStore) GetByEmail(email string) (*User, error) {
	rows, err := s.db.Query(sqlByEmail, email)
	defer rows.Close()

	if err != nil {
		return nil, fmt.Errorf("error retrieving by email: \n%v", err)
	}

	user := &User{}

	for rows.Next() {
		if err := rows.Scan(&user.ID, &user.Email,
			&user.FirstName, &user.LastName, &user.PassHash, &user.UserName, &user.PhotoURL); err != nil {
			return nil, fmt.Errorf("error scanning row: \n%v", err)
		}
	}

	//if we got an error fetching the next row, report it
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error getting next row: \n%v", err)
	}
	return user, nil
}

//GetByUserName returns the User with the given Username
func (s *SqlStore) GetByUserName(username string) (*User, error) {
	rows, err := s.db.Query(sqlByUsername, username)
	defer rows.Close()

	if err != nil {
		return nil, fmt.Errorf("error retrieving by email: \n%v", err)
	}

	user := &User{}

	for rows.Next() {
		if err := rows.Scan(&user.ID, &user.Email,
			&user.FirstName, &user.LastName, &user.PassHash, &user.UserName, &user.PhotoURL); err != nil {
			return nil, fmt.Errorf("error scanning row: \n%v", err)
		}
	}

	//if we got an error fetching the next row, report it
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error getting next row: \n%v", err)
	}
	return user, nil
}

//Insert inserts the user into the database, and returns
//the newly-inserted User, complete with the DBMS-assigned ID
func (s *SqlStore) Insert(user *User) (*User, error) {
	result, err := s.db.Exec(sqlInsertUser, user.Email, user.FirstName, user.LastName, user.PassHash, user.UserName, user.PhotoURL)
	if err != nil {
		return nil, err
	}
	newID, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}
	user.ID = newID
	return user, nil
}

//Update applies UserUpdates to the given user ID
//and returns the newly-updated user
func (s *SqlStore) Update(id int64, updates *Updates) (*User, error) {
	_, err := s.db.Exec(sqlUpdateUser, updates.FirstName, updates.LastName, id)
	if err != nil {
		return nil, err
	}
	//get function
	return s.GetByID(id)
}

//Delete deletes the user with the given ID
func (s *SqlStore) Delete(id int64) error {
	_, err := s.db.Exec(sqlDeleteUser, id)
	if err != nil {
		return err
	}
	return nil
}
