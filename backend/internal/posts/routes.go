package posts

import (
	"newstest-app/internal/bootstrap"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutesPosts(r *gin.Engine, db *gorm.DB, cfg *bootstrap.Config) {
	repo := NewPostRepository(db)
	service := NewServicePost(repo)
	handler := NewHandlerPost(service, cfg)

	group := r.Group("/v1/posts")
	{
		group.GET("/", handler.GetAll)
		group.GET("/:id", handler.GetByID)
		group.POST("/", handler.Create)
		group.PUT("/:id", handler.Update)
		group.DELETE("/:id", handler.Delete)
	}
}
