package actions

import (
	"net/http"

	"github.com/gobuffalo/buffalo"
)

func AccountHandler(c buffalo.Context) error {
	//TODO Fetch user from session
	return c.Render(http.StatusOK, r.HTML("pages/account.html"))
}
