package middleware

import (
	"net/http"
	"newstest-app/internal/bootstrap"
	"newstest-app/pkg/jwt"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(cfg *bootstrap.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"errors": "Authorization header is required"})
			c.Abort()
			return
		}

		parts := strings.SplitN(authHeader, " ", 2)
		if !(len(parts) == 2 && parts[0] == "Bearer") {
			c.JSON(http.StatusUnauthorized, gin.H{"errors": "Authorization header format must be Bearer {token}"})
			c.Abort()
			return
		}

		claims, err := jwt.ValidateToken(parts[1], cfg.JWTSecret)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"errors": "Invalid or expired token"})
			c.Abort()
			return
		}

		c.Set("user_id", claims.UserID)
		c.Set("email", claims.Email)

		c.Next()
	}
}
