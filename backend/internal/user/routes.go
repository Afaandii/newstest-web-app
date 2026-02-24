package user

import (
	"newstest-app/internal/bootstrap"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRouteUser(r *gin.Engine, db *gorm.DB, cfg *bootstrap.Config) {
	repo := NewUserRepository(db)
	service := NewUserService(repo)
	handler := NewUserHandler(service, cfg)

	group := r.Group("/v1/users")
	{
		group.GET("/", handler.GetAll)
		group.GET("/:id", handler.GetByID)
		group.POST("/", handler.Create)
		group.PUT("/:id", handler.Update)
		group.DELETE("/:id", handler.Delete)
	}
}
