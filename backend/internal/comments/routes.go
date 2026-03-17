package comments

import (
	"newstest-app/internal/bootstrap"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutesComments(r *gin.Engine, db *gorm.DB, cfg *bootstrap.Config) {
	repo := NewCommentRepository(db)
	service := NewCommentService(repo)
	handler := NewCommentHandler(service)

	v1 := r.Group("/v1")
	{
		// Comments for a specific post
		v1.GET("/posts/:id/comments", handler.GetCommentsByPost)
		v1.POST("/posts/:id/comments", handler.CreateComment)

		// Like interactions
		v1.POST("/comments/:comment_id/like", handler.ToggleLike)
	}
}