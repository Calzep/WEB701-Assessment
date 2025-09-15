package actions

import (
	"errors"
	"goprototype/models"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/pop/v6"
)

// UsersLogin handles POST /login
func UserLogin(c buffalo.Context) error {
	db, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return c.Error(500, errors.New("no database connection"))
	}

	email := c.Request().FormValue("email")
	password := c.Request().FormValue("password")

	user := &models.User{}
	err := db.Where("email = ? AND password = ?", email, password).First(user)
	if err != nil {
		return c.Render(401, r.JSON(map[string]string{"error": "Invalid credentials"}))
	}

	token, err := GenerateJWT(user.ID)
	if err != nil {
		return c.Error(500, err)
	}

	return c.Render(200, r.JSON(map[string]interface{}{
		"user":  user,
		"token": token,
	}))
}

func UserRegister(c buffalo.Context) error {
	db, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return c.Error(500, errors.New("no database connection"))
	}

	// Parse request body (JSON or form)
	user := &models.User{}
	if err := c.Bind(user); err != nil {
		return c.Render(400, r.JSON(map[string]string{"error": "Invalid request"}))
	}

	// Check required fields
	if user.Email == "" || user.Password == "" || user.UserType == "" {
		return c.Render(400, r.JSON(map[string]string{"error": "Missing required fields"}))
	}

	// Check if email already exists
	existing := &models.User{}
	err := db.Where("email = ?", user.Email).First(existing)
	if err == nil {
		return c.Render(400, r.JSON(map[string]string{"error": "Email already registered"}))
	}

	// TODO: hash password here for production use
	// user.Password = HashPassword(user.Password)

	// Insert new user
	if err := db.Create(user); err != nil {
		return c.Render(500, r.JSON(map[string]string{"error": "Failed to create user"}))
	}

	// Don't return the password
	user.Password = ""

	return c.Render(201, r.JSON(user))
}
