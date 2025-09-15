package actions

import (
	"time"

	"github.com/gofrs/uuid"
	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("097eb8253278fc36dd4d1d1a71db0f6dc8456052078c671530763786ad9de487")

func GenerateJWT(userID uuid.UUID) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID.String(),
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

func ValidateJWT(tokenStr string) (*jwt.Token, error) {
	return jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
}
