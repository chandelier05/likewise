package users

import (
	"crypto/md5"
	"encoding/hex"
	"testing"

	"golang.org/x/crypto/bcrypt"
)

//TODO: add tests for the various functions in user.go, as described in the assignment.
//use `go test -cover` to ensure that you are covering all or nearly all of your code paths.

func TestValidate(t *testing.T) {
	newUser := &NewUser{
		Email:        "tango2@uw.edu",
		Password:     "WinterIsComing",
		PasswordConf: "WinterIsComing",
		UserName:     "tango222",
		FirstName:    "Olivia",
		LastName:     "Tang",
	}
	if err := newUser.Validate(); err != nil {
		t.Errorf("New User Valid but tested as Invalid: error: %v", err)
	}
	newUser.Email = "tango2.edu"
	if err := newUser.Validate(); err == nil {
		t.Errorf("Invalid Email: Expected: \n%s:", newUser.Email)
	}
	newUser.Email = "tango2@uw.edu"
	newUser.Password = "ya"
	if err := newUser.Validate(); err == nil {
		t.Errorf("Validate did not throw an error when password not >= 6 characters: Length:\n%s", string(len(newUser.Password)))
	}
	newUser.Password = "SpringIsComing"
	if err := newUser.Validate(); err == nil {
		t.Errorf("Validated with no errors when Password and PasswordConf do not match: Password:\n%s\n: PasswordConf:\n%s ", newUser.Password, newUser.PasswordConf)
	}
	newUser.Password = "WinterIsComing"
	newUser.UserName = " "
	if err := newUser.Validate(); err == nil {
		t.Errorf("UserName is a zero length and no error was thrown: UserName:\n%s\n", newUser.UserName)
	}
}

func TestToUser(t *testing.T) {
	newUser := &NewUser{
		Email:        "tango2@uw.edu",
		Password:     "WinterIsComing",
		PasswordConf: "WinterIsComing",
		UserName:     "tango222",
		FirstName:    "Olivia",
		LastName:     "Tang",
	}

	newUser2 := &NewUser{
		Email:        "tAngo2@uw.edu",
		Password:     "WinterIsComing",
		PasswordConf: "WinterIsComing",
		UserName:     "tango222",
		FirstName:    "Olivia",
		LastName:     "Tang",
	}
	
	
	hasher := md5.New()
	hasher.Write([]byte(newUser.Email))
	ehash := hex.EncodeToString(hasher.Sum(nil))
	gravatarBasePhotoURL := "https://www.gravatar.com/avatar/" + ehash

	user, _ := newUser.ToUser()
	user2, _ := newUser2.ToUser()

		if user.PhotoURL != gravatarBasePhotoURL {
			t.Errorf("PhotoURL is incorrect:expected:\n%s\n actual: \n%s", gravatarBasePhotoURL, user.PhotoURL)
		}
		if user2.PhotoURL != gravatarBasePhotoURL {
			t.Errorf("PhotoURL is incorrect:expected:\n%s\n actual: \n%s", gravatarBasePhotoURL, user2.PhotoURL)
		}
		if err := bcrypt.CompareHashAndPassword(user.PassHash, []byte(newUser.Password)); err != nil {
			t.Errorf("Password stored in user.PassHash does not match!!: Hint: Check SetPassword(), error: \n%s", err)
		}
	
}

//verify that it returns the correct results given the various possible inputs (no FirstName, no LastName, neither
//field set, both fields set)
func TestFullName(t *testing.T) {
	cases := []NewUser{
		{
			Email:        "tango2@uw.edu",
			Password:     "WinterIsComing",
			PasswordConf: "WinterIsComing",
			UserName:     "tango222",
			FirstName:    "Olivia",
			LastName:     "Tang",
		},
		{
			Email:        "tango2@uw.edu",
			Password:     "WinterIsComing",
			PasswordConf: "WinterIsComing",
			UserName:     "tango222",
			FirstName:    "Olivia",
		},
		{
			Email:        "tango2@uw.edu",
			Password:     "WinterIsComing",
			PasswordConf: "WinterIsComing",
			UserName:     "tango222",
			LastName:     "Tang",
		},
		{
			Email:        "tango2@uw.edu",
			Password:     "WinterIsComing",
			PasswordConf: "WinterIsComing",
			UserName:     "tango222",
		},
	}

	expected := []string{
		"Olivia Tang",
		"Olivia",
		"Tang",
		"",
	}

	for i := 0; i < len(cases); i++ {
		if u, _ := cases[i].ToUser(); u.FullName() != expected[i] {
			t.Errorf("FullName not returned correctly Expected:\n%s\n: Actual: \n%s", expected[i], u.FullName())
		}
	}
}

func TestAuthenticate(t *testing.T) {
	newUser := &NewUser{
		Email:        "tango2@uw.edu",
		Password:     "WinterIsComing",
		PasswordConf: "WinterIsComing",
		UserName:     "tango222",
		FirstName:    "Olivia",
		LastName:     "Tang",
	}

	cases := []string{
		"winteriscoming",
		"yeah123",
		"Updawg",
	}

	u, _ := newUser.ToUser()
	if err := u.Authenticate("WinterIsComing"); err != nil {
		t.Errorf("Error when not expected: ComparedPassword: \n WinterIsComing: Error: \n%s\n", err)
	}

	for _, c := range cases {
		if err := u.Authenticate(c); err == nil {
			t.Errorf("Error: string: \n%s should not match user.PassHash!", c)
		}
	}
}

func TestApplyUpdates(t *testing.T) {
	newUser := &NewUser{
		Email:        "tango2@uw.edu",
		Password:     "WinterIsComing",
		PasswordConf: "WinterIsComing",
		UserName:     "tango222",
		FirstName:    "Olivia",
		LastName:     "Tang",
	}

	updates := &Updates{
		FirstName: "Sonic", 
		LastName: "TheHedgehog",
	}

	user,_ := newUser.ToUser()

	fn := "Sonic TheHedgehog"

	user.ApplyUpdates(updates)

	if user.FirstName != updates.FirstName && user.LastName != updates.LastName {
		t.Errorf("FirstName and LastName in User were not updated correctly! Expected: \n%s\n, Actual: \n%s",fn, user.FullName() )
	}
}
