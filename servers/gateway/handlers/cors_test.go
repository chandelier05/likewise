package handlers

/*

  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, PUT, POST, PATCH, DELETE
  Access-Control-Allow-Headers: Content-Type, Authorization
  Access-Control-Expose-Headers: Authorization
  Access-Control-Max-Age: 600
*/

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestServeHTTP(t *testing.T) {
	mux := http.NewServeMux()
	c := &CORS{mux}
	resp := httptest.NewRecorder()
	req, _ := http.NewRequest("OPTIONS", "", nil)
	c.ServeHTTP(resp, req)
	if resp.Code != http.StatusOK {
		t.Errorf("incorrect response status code: expected %d but got %d", http.StatusOK, resp.Code)
	}
	header1 := "Access-Control-Allow-Origin"
	header2 := "Access-Control-Allow-Methods"
	header3 := "Access-Control-Allow-Headers"
	header4 := "Access-Control-Expose-Headers"
	header5 := "Access-Control-Max-Age"

	exp1 := "*"
	exp2 := "GET, PUT, POST, PATCH, DELETE"
	exp3 := "Content-Type, Authorization"
	exp4 := "Authorization"
	exp5 := "600"

	ctype1 := resp.Header().Get(header1)
	ctype2 := resp.Header().Get(header2)
	ctype3 := resp.Header().Get(header3)
	ctype4 := resp.Header().Get(header4)
	ctype5 := resp.Header().Get(header5)

	if len(ctype1) == 0 {
		t.Errorf("No '%s' header found in the response: must be there start with `%s`",header1, exp1)
	} else if !strings.HasPrefix(ctype1, exp1) {
		t.Errorf("incorrect `%s` header value: expected it to start with `%s` but got `%s`", header1, exp1, ctype1)
	}

	if len(ctype2) == 0 {
		t.Errorf("No `%s` header found in the response: must be there start with `%s`", header2,exp2)
	} else if !strings.HasPrefix(ctype2, exp2) {
		t.Errorf("incorrect `%s` header value: expected it to start with `%s` but got `%s`", header2, exp2, ctype2)
	}

	if len(ctype3) == 0 {
		t.Errorf("No `%s` header found in the response: must be there start with `%s`", header3, exp3)
	} else if !strings.HasPrefix(ctype3, exp3) {
		t.Errorf("incorrect `%s` header value: expected it to start with `%s` but got `%s`", header3, exp3, ctype3)
	}

	if len(ctype4) == 0 {
		t.Errorf("No `%s` header found in the response: must be there start with `%s`", header4, exp4)
	} else if !strings.HasPrefix(ctype4, exp4) {
		t.Errorf("incorrect `%s` header value: expected it to start with `%s` but got `%s`",header4, exp4, ctype4)
	}

	if len(ctype5) == 0 {
		t.Errorf("No `%s` header found in the response: must be there start with `%s`", header5, exp1)
	} else if !strings.HasPrefix(ctype5, exp5) {
		t.Errorf("incorrect `%s` header value: expected it to start with `%s` but got `%s`", header5, exp5, ctype5)
	}

}
