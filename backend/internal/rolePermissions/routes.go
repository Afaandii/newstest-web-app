package rolepermissions

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutesRolePermissions(r *gin.Engine, db *gorm.DB) {
	repo := NewRolePermissionsRepository(db)
	service := NewServiceRolePermissions(repo)
	handler := NewHandlerRolePermissions(service)

	group := r.Group("/v1/role-permissions")
	{
		group.GET("/:roleId", handler.GetByRoleID)
		group.POST("", handler.Toggle)
	}
}
