package auth

import (
	"newstest-app/internal/bootstrap"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutesAuth(r *gin.Engine, db *gorm.DB, cfg *bootstrap.Config) {
	repo := NewAuthRepository(db)
	service := NewServiceAuth(repo, cfg)
	handler := NewHandlerAuth(service)

	group := r.Group("/v1/auth")
	{
		group.POST("/register", handler.Register)
		group.POST("/login", handler.Login)
	}
}
