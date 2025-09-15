package actions

import (
	"goprototype/models"
	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/pop/v6"
)

// UsersLogin handles POST /login
func UserLogin(c buffalo.Context) error {
	db, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return c.Error(500, err)
	}

	email := c.Request().FormValue("email")
	password := c.Request().FormValue("password")

	user := &models.User{}
	err := db.Where("email = ? AND password = ?", email, password).First(user)
	if err != nil {
		return c.Render(401, r.JSON(map[string]string{"error": "Invalid credentials"}))
	}

	return c.Render(200, r.JSON(map[string]interface{}{
		"user":  user,
		"token": "fake-jwt-token", // placeholder, real JWT later
	}))
}
