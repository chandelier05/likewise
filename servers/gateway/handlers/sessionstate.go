package handlers

import (
	"time"
	"homework-tango222/servers/gateway/models/users"
)

//TODO: define a session state struct for this web server
//see the assignment description for the fields you should include
//remember that other packages can only see exported fields!

//SessionState is a struct that stores a session state
type SessionState struct{
	SessionBegin time.Time `json:"sessionBegin"`
	AuthUser *users.User `json:"authUser"`
}

