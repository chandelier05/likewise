package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	//"log"
	"net/http"
	"net/url"

	//"reflect"

	//"path/filepath"
	"strconv"
	"strings"

	"golang.org/x/net/html"
)

//PreviewImage represents a preview image for a page
type PreviewImage struct {
	URL       string `json:"url,omitempty"`
	SecureURL string `json:"secureURL,omitempty"`
	Type      string `json:"type,omitempty"`
	Width     int    `json:"width,omitempty"`
	Height    int    `json:"height,omitempty"`
	Alt       string `json:"alt,omitempty"`
}

//PageSummary represents summary properties for a web page
type PageSummary struct {
	Type        string          `json:"type,omitempty"`
	URL         string          `json:"url,omitempty"`
	Title       string          `json:"title,omitempty"`
	SiteName    string          `json:"siteName,omitempty"`
	Description string          `json:"description,omitempty"`
	Author      string          `json:"author,omitempty"`
	Keywords    []string        `json:"keywords,omitempty"`
	Icon        *PreviewImage   `json:"icon,omitempty"`
	Images      []*PreviewImage `json:"images,omitempty"`
}

//SummaryHandler handles requests for the page summary API.
//This API expects one query string parameter named `url`,
//which should contain a URL to a web page. It responds with
//a JSON-encoded PageSummary struct containing the page summary
//meta-data.
func SummaryHandler(w http.ResponseWriter, r *http.Request) {
	/*TODO: add code and additional functions to do the following:
	- Add an HTTP header to the response with the name
	 `Access-Control-Allow-Origin` and a value of `*`. This will
	  allow cross-origin AJAX requests to your server.
	*/
	w.Header().Set("Access-Control-Allow-Origin", "*")
	/*
		- Get the `url` query string parameter value from the request.
		  If not supplied, respond with an http.StatusBadRequest error.
		- Call fetchHTML() to fetch the requested URL. See comments in that
		  function for more details.
	*/
	urlvalue := r.URL.String()
	urlindex := strings.Index(urlvalue, "http")
	urlVal := urlvalue[urlindex:]

	if urlVal == "" {
		fmt.Println("error: url not supplied:", http.StatusBadRequest)
	}

	stream, err := fetchHTML(urlVal)
	if err != nil {
		//.Fatalf() prints the error and exits the process
		fmt.Printf("(1) error fetching URL: %v\n", err)
	}

	/*
		- Call extractSummary() to extract the page summary meta-data,
		  as directed in the assignment. See comments in that function
		  for more details
		- Close the response HTML stream so that you don't leak resources.
		- Finally, respond with a JSON-encoded version of the PageSummary
		  struct. That way the client can easily parse the JSON back into
		  an object. Remember to tell the client that the response content
		  type is JSON.

		Helpful Links:
		https://golang.org/pkg/net/http/#Request.FormValue
		https://golang.org/pkg/net/http/#Error
		https://golang.org/pkg/encoding/json/#NewEncoder
	*/
	summary, err := extractSummary(urlvalue, stream)
	stream.Close()
	enc := json.NewEncoder(w)
	if err := enc.Encode(summary); err != nil {
		fmt.Printf("error encoding struct into JSON: %v/n", err)
	}
	w.Header().Set("Content-Type", "application/json")
}

//fetchHTML fetches `pageURL` and returns the body stream or an error.
//Errors are returned if the response status code is an error (>=400),
//or if the content type indicates the URL is not an HTML page.
func fetchHTML(pageURL string) (io.ReadCloser, error) {
	/*TODO: Do an HTTP GET for the page URL. If the response status
	code is >= 400, return a nil stream and an error. If the response
	content type does not indicate that the content is a web page, return
	a nil stream and an error. Otherwise return the response body and
	no (nil) error.

	To test your implementation of this function, run the TestFetchHTML
	test in summary_test.go. You can do that directly in Visual Studio Code,
	or at the command line by running:
		go test -run TestFetchHTML

	Helpful Links:
	https://golang.org/pkg/net/http/#Get
	*/
	fmt.Println(pageURL)
	resp, err := http.Get(pageURL)
	if err != nil {
		return nil, err
	}
	if resp.StatusCode >= 400 {
		return nil, fmt.Errorf("resp.StatusCode: %d", resp.StatusCode)
	}
	ctype := resp.Header.Get("Content-Type")
	if !strings.HasPrefix(ctype, "text/html") {
		return nil, fmt.Errorf("Content-Type does not equal 'text.html'")
	}
	return resp.Body, nil
}

//extractSummary tokenizes the `htmlStream` and populates a PageSummary
//struct with the page's summary meta-data.
func extractSummary(pageURL string, htmlStream io.ReadCloser) (*PageSummary, error) {
	/*TODO: tokenize the `htmlStream` and extract the page summary meta-data
	according to the assignment description.

	To test your implementation of this function, run the TestExtractSummary
	test in summary_test.go. You can do that directly in Visual Studio Code,
	or at the command line by running:
		go test -run TestExtractSummary

	Helpful Links:
	https://drstearns.github.io/tutorials/tokenizing/
	http://ogp.me/
	https://developers.facebook.com/docs/reference/opengraph/
	https://golang.org/pkg/net/url/#URL.ResolveReference
	*/
	summary := new(PageSummary)
	tokenizer := html.NewTokenizer(htmlStream)
	//variable to keep track if og:desc already exists
	ogDesc := false
	//var to see if og:title already called
	ogTitle := false
	//var to keep track of current image in array Images
	imagesIndex := -1
	//parse pageurl 
	u, _ := url.Parse(pageURL)
	for {
		tokenType := tokenizer.Next()

		if tokenType == html.ErrorToken {
			err := tokenizer.Err()
			if err == io.EOF {
				return summary, nil
			}
			return nil, fmt.Errorf("error toeknizing HTML: %v", tokenizer.Err())
		}

		if tokenType == html.StartTagToken || tokenType == html.SelfClosingTagToken {
			token := tokenizer.Token()

			if "meta" == token.Data {
				//extract type
				Type, ok := extractMetaProperty(token, "og:type")
				if ok {
					summary.Type = Type
				}
				//extract url
				URL, ok := extractMetaProperty(token, "og:url")
				if ok {
					summary.URL = URL
				}
				//extract title
				Title, ok := extractMetaProperty(token, "og:title")
				if ok {
					summary.Title = Title
					ogTitle = true
				}
				//extract site name
				SiteName, ok := extractMetaProperty(token, "og:site_name")
				if ok {
					summary.SiteName = SiteName
				}
				//extract description
				Description, ok := extractMetaProperty(token, "og:description")
				if ok {
					summary.Description = Description
					ogDesc = true
				}
				Desc, ok := extractMetaName(token, "description")
				if ok && !ogDesc {
					summary.Description = Desc
				}
				//extract author
				Author, ok := extractMetaName(token, "author")
				if ok {
					summary.Author = Author
				}
				//extract keywords
				Keywords, ok := extractMetaName(token, "keywords")
				if ok {
					keys := strings.Split(Keywords, ",")
					for _, key := range keys {
						summary.Keywords = append(summary.Keywords, strings.TrimSpace(key))
					}
				}
				//extract image content
				imageURL, ok := extractMetaProperty(token, "og:image")
				if ok {
						previewImage := new(PreviewImage)
						if strings.Contains(imageURL, "http"){
							previewImage.URL = imageURL
						}else{
							previewImage.URL = u.Scheme + "://" + u.Host + imageURL
						}
						summary.Images = append(summary.Images, previewImage)
						imagesIndex ++
				}
				imageSecureURL, ok := extractMetaProperty(token, "og:image:secure_url")
				if ok {
					summary.Images[imagesIndex].SecureURL = imageSecureURL
				}
				imageType, ok := extractMetaProperty(token, "og:image:type")
				if ok {
					summary.Images[imagesIndex].Type = imageType
				}
				imageWidth, ok := extractMetaProperty(token, "og:image:width")
				if ok {
					iW, err := strconv.Atoi(imageWidth)
					if err == nil {
						summary.Images[imagesIndex].Width = iW
					}
				}
				imageHeight, ok := extractMetaProperty(token, "og:image:height")
				if ok {
					iH, err := strconv.Atoi(imageHeight)
					if err == nil {
						summary.Images[imagesIndex].Height = iH
					}
				}
				imageAlt, ok := extractMetaProperty(token, "og:image:alt")
				if ok {
					summary.Images[imagesIndex].Alt = imageAlt
				}
			}
			if "title" == token.Data {
				tokenType = tokenizer.Next()
				if tokenType == html.TextToken && !ogTitle {
					summary.Title = tokenizer.Token().Data
				}
			}
			if "link" == token.Data {
				Pi := &PreviewImage{}
				href, height, width, typ, ok := extractMetaIcon(token)
				if ok {
					if strings.Contains(href, "http") {
						Pi.URL = href
					} else {
						Pi.URL = u.Scheme + "://" + u.Host + href
					}
					if height != 0 && width != 0 {
						Pi.Height = height
						Pi.Width = width
					}
					if typ != "" {
						Pi.Type = typ
					}
					summary.Icon = Pi
				}

			}
		}
	}
}

//extracts content from tag by meta property
func extractMetaProperty(t html.Token, prop string) (content string, ok bool) {
	for _, attr := range t.Attr {
		if attr.Key == "property" && attr.Val == prop {
			ok = true
		}
		if attr.Key == "content" {
			content = attr.Val
		}
	}
	return
}

//extracts content from tag by meta name
func extractMetaName(t html.Token, name string) (content string, ok bool) {
	for _, attr := range t.Attr {
		if attr.Key == "name" && attr.Val == name {
			ok = true
		}
		if attr.Key == "content" {
			content = attr.Val
		}
	}
	return
}

//extracts content from tag by meta rel
func extractMetaRel(t html.Token, rel string) (content string, ok bool) {
	for _, attr := range t.Attr {
		if attr.Key == "rel" && attr.Val == rel {
			ok = true
		}
		if attr.Key == "content" {
			content = attr.Val
		}
	}
	return
}

//extracts icon attributes
func extractMetaIcon(t html.Token) (href string, height int, width int, typ string, ok bool) {
	for _, attr := range t.Attr {
		if attr.Key == "rel" && attr.Val == "icon" {
			ok = true
		}
		if attr.Key == "href" {
			href = attr.Val
		}
		if attr.Key == "sizes" {
			sizes := attr.Val
			if sizes != "any" {
				splitSizes := strings.Split(sizes, "x")
				h := strings.TrimSpace(splitSizes[0])
				fmt.Println(splitSizes[0])
				hei, _ := strconv.Atoi(h)
				height = hei
				wid := strings.TrimSpace(splitSizes[1])
				we, _ := strconv.Atoi(wid)
				width = we
			}
		}
		if attr.Key == "type" {
			typ = attr.Val
		}
	}
	return
}
