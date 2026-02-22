package permissions

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutesPermissions(r *gin.Engine, db *gorm.DB) {
	repo := NewPermissionRepository(db)
	service := NewServicePermissions(repo)
	handler := NewHandlerPermissions(service)

	group := r.Group("/v1/permissions")
	{
		group.GET("/", handler.GetAll)
		group.GET("/:id", handler.GetByID)
		group.POST("/", handler.Create)
		group.PUT("/:id", handler.Update)
		group.DELETE("/:id", handler.Delete)
	}
}
