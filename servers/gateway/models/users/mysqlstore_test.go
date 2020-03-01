package users

import (
	"fmt"
	"regexp"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
)

func TestGetByID(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("error creating sqlmock: %v", err)
	}

	// use the *sql.DB to construct a new sql store
	sqlStore := NewSqlStore(db)
	newUser := &NewUser{
		Email:        "tango2@uw.edu",
		Password:     "WinterIsComing",
		PasswordConf: "WinterIsComing",
		UserName:     "tango222",
		FirstName:    "Olivia",
		LastName:     "Tang",
	}

	user, _ := newUser.ToUser()
	var newID int64 = 1

	//add rows
	rows := sqlmock.NewRows([]string{"id", "email", "first_name", "last_name", "pass_hash", "user_name", "photo_url"}).
		AddRow(newID, user.Email, user.FirstName, user.LastName, user.PassHash, user.UserName, user.PhotoURL).
		RowError(2, fmt.Errorf("row error"))

	expectedSQL := regexp.QuoteMeta(sqlByID)
	// expect to exec the following sql statement
	mock.ExpectQuery(expectedSQL).
		// with these arguments
		WithArgs(
			user.ID,
		).
		WillReturnRows(rows)

	u, err := sqlStore.GetByID(newID)

	if err != nil {
		t.Fatalf("unexpected error during GetByID: %v", err)
	}
	if u == nil {
		t.Fatal("nil user returned from GetByID")
	} else if u.ID != newID {
		t.Fatalf("incorrect ID for returned user: expected %d but got %d", newID, u.ID)
	}
}

func TestGetByEmail(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("error creating sqlmock: %v", err)
	}

	// use the *sql.DB to construct a new sql store
	sqlStore := NewSqlStore(db)
	newUser := &NewUser{
		Email:        "tango2@uw.edu",
		Password:     "WinterIsComing",
		PasswordConf: "WinterIsComing",
		UserName:     "tango222",
		FirstName:    "Olivia",
		LastName:     "Tang",
	}

	user, _ := newUser.ToUser()
	var newID int64 = 1

	//add rows
	rows := sqlmock.NewRows([]string{"id", "email", "first_name", "last_name", "pass_hash", "user_name", "photo_url"}).
		AddRow(newID, user.Email, user.FirstName, user.LastName, user.PassHash, user.UserName, user.PhotoURL).
		RowError(2, fmt.Errorf("row error"))

	expectedSQL := regexp.QuoteMeta(sqlByEmail)
	// expect to exec the following sql statement
	mock.ExpectQuery(expectedSQL).
		// with these arguments
		WithArgs(
			user.ID,
		).
		WillReturnRows(rows)

	u, err := sqlStore.GetByEmail(user.Email)
	if err != nil {
		t.Fatalf("unexpected error during GetByEmail: %v", err)
	}
	if u == nil {
		t.Fatal("nil user returned from GetByID")
	} else if u.Email != user.Email {
		t.Fatalf("incorrect email for returned user: expected %s but got %s", user.Email, u.Email)
	}

}

func TestGetByUserName(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("error creating sqlmock: %v", err)
	}

	// use the *sql.DB to construct a new sql store
	sqlStore := NewSqlStore(db)
	newUser := &NewUser{
		Email:        "tango2@uw.edu",
		Password:     "WinterIsComing",
		PasswordConf: "WinterIsComing",
		UserName:     "tango222",
		FirstName:    "Olivia",
		LastName:     "Tang",
	}

	user, _ := newUser.ToUser()
	var newID int64 = 1

	//add rows
	rows := sqlmock.NewRows([]string{"id", "email", "first_name", "last_name", "pass_hash", "user_name", "photo_url"}).
		AddRow(newID, user.Email, user.FirstName, user.LastName, user.PassHash, user.UserName, user.PhotoURL).
		RowError(2, fmt.Errorf("row error"))

	expectedSQL := regexp.QuoteMeta(sqlByUsername)
	// expect to exec the following sql statement
	mock.ExpectQuery(expectedSQL).
		// with these arguments
		WithArgs(
			user.ID,
		).
		WillReturnRows(rows)

	u, err := sqlStore.GetByUserName(user.UserName)
	if err != nil {
		t.Fatalf("unexpected error during GetByUserName: %v", err)
	}
	if u == nil {
		t.Fatal("nil user returned from GetByUserName")
	} else if u.UserName != user.UserName {
		t.Fatalf("incorrect username for returned user: expected %s but got %s", user.UserName, u.UserName)
	}

}

func TestInsert(t *testing.T) {
	// set up sqlMock, New() returns (*sql.DB, Sqlmock, error)
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("error creating sqlmock: %v", err)
	}

	// use the *sql.DB to construct a new sql store
	sqlStore := NewSqlStore(db)

	// create new mock user
	newUser := &NewUser{
		Email:        "tango2@uw.edu",
		Password:     "WinterIsComing",
		PasswordConf: "WinterIsComing",
		UserName:     "tango222",
		FirstName:    "Olivia",
		LastName:     "Tang",
	}

	user, _ := newUser.ToUser()

	// must use regexp.QuoteMeta() to escape the regexp
	// special characters in SQL statements
	expectedSQL := regexp.QuoteMeta(sqlInsertUser)

	// simple success case
	var newID int64 = 1

	// expect to exec the following sql statement
	mock.ExpectExec(expectedSQL).
		// with these arguments
		WithArgs(
			user.Email,
			user.FirstName,
			user.LastName,
			user.PassHash,
			user.UserName,
			user.PhotoURL,
		).
		WillReturnResult(sqlmock.NewResult(newID, 1))

	// now execute the insertion
	insertedUser, err := sqlStore.Insert(user)
	if err != nil {
		t.Fatalf("unexpected error during successful insert: %v", err)
	}
	if insertedUser == nil {
		t.Fatal("nil user returned from insert")
	} else if insertedUser.ID != newID {
		t.Fatalf("incorrect new ID: expected %d but got %d", newID, insertedUser.ID)
	}
}

func TestUpdate(t *testing.T) {
	// set up sqlMock, New() returns (*sql.DB, Sqlmock, error)
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("error creating sqlmock: %v", err)
	}

	// use the *sql.DB to construct a new sql store
	sqlStore := NewSqlStore(db)

	// create new mock user
	newUser := &NewUser{
		Email:        "tango2@uw.edu",
		Password:     "WinterIsComing",
		PasswordConf: "WinterIsComing",
		UserName:     "tango222",
		FirstName:    "Olivia",
		LastName:     "Tang",
	}
	user, _ := newUser.ToUser()
	sqlStore.Insert(user)

	update := &Updates{
		FirstName: "Abigail",
		LastName:  "Lee",
	}

	// simple success case
	var newID int64 = 1

	expectedSQL := regexp.QuoteMeta(sqlUpdateUser)
	// expect to exec the following sql statement
	mock.ExpectExec(expectedSQL).
		// with these arguments
		WithArgs(
			update.FirstName,
			update.LastName,
			user.ID,
		).
		WillReturnResult(sqlmock.NewResult(newID, 1))

		// now execute the insertion
	updatedUser, err := sqlStore.Update(newID, update)
	if err != nil {
		t.Fatalf("unexpected error during successful update: %v", err)
	}
	if updatedUser == nil {
		t.Fatal("nil user returned from insert")
	} else if updatedUser.FirstName != update.FirstName && updatedUser.LastName != update.LastName {
		t.Fatalf("incorrect update: expected firstname: %s\n but got %s\n: expected lastname:%s\n but got %s",
			update.FirstName, updatedUser.FirstName, update.LastName, updatedUser.LastName)
	}
}

func TestDelete(t *testing.T) {
	// set up sqlMock, New() returns (*sql.DB, Sqlmock, error)
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("error creating sqlmock: %v", err)
	}

	// use the *sql.DB to construct a new sql store
	sqlStore := NewSqlStore(db)

	// create new mock user
	newUser := &NewUser{
		Email:        "tango2@uw.edu",
		Password:     "WinterIsComing",
		PasswordConf: "WinterIsComing",
		UserName:     "tango222",
		FirstName:    "Olivia",
		LastName:     "Tang",
	}

	user, _ := newUser.ToUser()
	sqlStore.Insert(user)
	// simple success case
	var newID int64 = 1

	expectedSQL := regexp.QuoteMeta(sqlDeleteUser)
	// expect to exec the following sql statement
	mock.ExpectExec(expectedSQL).
		// with these arguments
		WithArgs(
			user.ID,
		).
		WillReturnResult(sqlmock.NewResult(newID, 1))

	// now execute the deletion
	err2 := sqlStore.Delete(newID)

	if err2 != nil {
		t.Fatalf("unexpected error during successful deletion: %v", err2)
	}
	if _, err3 := sqlStore.GetByID(newID); err3 == nil {
		t.Fatalf("incorrect deletion, no error when called GetByID: %v", err3)
	}
}
