package actions

import (
	"net/http"
	"strings"

	"github.com/gobuffalo/buffalo"
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
