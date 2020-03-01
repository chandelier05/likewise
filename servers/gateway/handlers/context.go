package handlers

import (
	"homework-tango222/servers/gateway/sessions"
	"homework-tango222/servers/gateway/models/users"
	"homework-tango222/servers/gateway/indexes"
)

//TODO: define a handler context struct that
//will be a receiver on any of your HTTP
//handler functions that need access to
//globals, such as the key used for signing
//and verifying SessionIDs, the session store
//and the user store


//Context is a struct that stores Handler Context that will be a reciever
type Context struct{
	Key string 
	SessionsStore sessions.Store 
	UsersStore users.Store 
	Trie *indexes.Trie
}

//NewContext creates a context struct
func NewContext(key string, sessionstore sessions.Store, usersstore users.Store, tr *indexes.Trie) *Context{
	return &Context{
		Key: key, 
		SessionsStore: sessionstore,
		UsersStore: usersstore,
		Trie: tr,
	}
}
