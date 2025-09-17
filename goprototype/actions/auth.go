package actions

import (
	"goprototype/models"
	"net/http"
	"strings"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/pop/v6"
	"github.com/gofrs/uuid"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware(next buffalo.Handler) buffalo.Handler {
	return func(c buffalo.Context) error {
		authHeader := c.Request().Header.Get("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			return c.Error(http.StatusUnauthorized, nil)
		}

		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
		token, err := ValidateJWT(tokenStr)
		if err != nil || !token.Valid {
			return c.Error(http.StatusUnauthorized, err)
		}

		// Add claims to context if needed
		claims := token.Claims.(jwt.MapClaims)
		c.Set("user_id", claims["user_id"])

		return next(c)
	}
}

func SetCurrentUser(next buffalo.Handler) buffalo.Handler {
	return func(c buffalo.Context) error {
		db, ok := c.Value("tx").(*pop.Connection)
		if !ok {
			return c.Error(http.StatusInternalServerError, nil)
		}
		c.Set("current_user", nil)
		authHeader := c.Request().Header.Get("Authorization")
		if authHeader != "" {
			parts := strings.Split(authHeader, " ")
			if len(parts) == 2 && strings.ToLower(parts[0]) == "bearer" {
				tokenStr := parts[1]
				token, err := ValidateJWT(tokenStr)
				if err == nil && token.Valid {
					claims, ok := token.Claims.(jwt.MapClaims)
					if ok {
						userIDStr, _ := claims["user_id"].(string)
						if userIDStr != "" {
							userID, err := uuid.FromString(userIDStr)
							if err == nil {
								user := &models.User{}
								if err := db.Find(user, userID); err == nil {
									c.Set("current_user", user)
								}
							}
						}
					}
				}
			}
		}

		return next(c)
	}
}
