package sessions

import (
	"errors"
	"log"
	"net/http"
	"strings"
)

const headerAuthorization = "Authorization"
const paramAuthorization = "auth"
const schemeBearer = "Bearer "

//ErrNoSessionID is used when no session ID was found in the Authorization header
var ErrNoSessionID = errors.New("no session ID found in " + headerAuthorization + " header")

//ErrInvalidScheme is used when the authorization scheme is not supported
var ErrInvalidScheme = errors.New("authorization scheme not supported")

//BeginSession creates a new SessionID, saves the `sessionState` to the store, adds an
//Authorization header to the response with the SessionID, and returns the new SessionID
func BeginSession(signingKey string, store Store, sessionState interface{}, w http.ResponseWriter) (SessionID, error) {
	//TODO:
	//- create a new SessionID
	sID, err := NewSessionID(signingKey)
	//- save the sessionState to the store
	if err == nil {
		store.Save(sID, sessionState)
		//- add a header to the ResponseWriter that looks like this:
		//    "Authorization: Bearer <sessionID>"
		//  where "<sessionID>" is replaced with the newly-created SessionID
		//  (note the constants declared for you above, which will help you avoid typos)
		w.Header().Set(headerAuthorization, schemeBearer+sID.String())
		return sID, nil
	}
	return InvalidSessionID, ErrNoSessionID
}

//GetSessionID extracts and validates the SessionID from the request headers
func GetSessionID(r *http.Request, signingKey string) (SessionID, error) {
	//TODO: get the value of the Authorization header,
	//or the "auth" query string parameter if no Authorization header is present,
	//and validate it. If it's valid, return the SessionID. If not
	//return the validation error.
	val := r.Header.Get(headerAuthorization)
	if len(val) == 0 {
		urlVal := r.URL.String()
		index := strings.Index(urlVal, "auth=")
		if index == -1 {
			return InvalidSessionID, ErrNoSessionID
		}
		valIndex := index + len("auth=")
		val = urlVal[valIndex:]
	}

	if strings.Contains(val, schemeBearer) {
		val = val[len(schemeBearer):]
		//fmt.Print("	SCHEME: " + string(val))
		//fmt.Print("LENGTH: " + string(len(val)))
	} else {
		return InvalidSessionID, ErrInvalidScheme
	}
	id, err := ValidateID(val, signingKey)
	if err != nil {
		return InvalidSessionID, ErrNoSessionID
	}
	return id, nil
}

//GetState extracts the SessionID from the request,
//gets the associated state from the provided store into
//the `sessionState` parameter, and returns the SessionID
func GetState(r *http.Request, signingKey string, store Store, sessionState interface{}) (SessionID, error) {
	//TODO: get the SessionID from the request, and get the data
	//associated with that SessionID from the store.
	sID, err := GetSessionID(r, signingKey)
	log.Print("SessionID: " + sID)
	if err != nil {
		return InvalidSessionID, err
	}
	err2 := store.Get(sID, sessionState)
	if err2 != nil {
		return InvalidSessionID, err2
	}
	return sID, nil 

}

//EndSession extracts the SessionID from the request,
//and deletes the associated data in the provided store, returning
//the extracted SessionID.
func EndSession(r *http.Request, signingKey string, store Store) (SessionID, error) {
	//TODO: get the SessionID from the request, and delete the
	//data associated with it in the store.
	sID, err := GetSessionID(r, signingKey)
	if err == nil {
		store.Delete(sID)
		return sID, nil
	}
	return InvalidSessionID, ErrInvalidID
}
