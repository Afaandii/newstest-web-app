package role

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutesRole(r *gin.Engine, db *gorm.DB) {
	repo := NewRoleRepository(db)
	service := NewServiceRole(repo)
	handler := NewHandlerRole(service)

	group := r.Group("/v1/roles")
	{
		group.GET("", handler.GetAll)
		group.GET("/:id", handler.GetByID)
		group.POST("", handler.Create)
		group.PUT("/:id", handler.Update)
		group.DELETE("/:id", handler.Delete)
	}
}
