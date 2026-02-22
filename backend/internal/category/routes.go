package category

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutesCategory(r *gin.Engine, db *gorm.DB){
	repo := NewCategoryRepository(db)
	service := NewServiceCategory(repo)
	handler := NewHandlerCategory(service)

	group := r.Group("/v1/category")
	{
		group.GET("/", handler.GetAll)
		group.GET("/:id", handler.GetByID)
		group.POST("/", handler.Create)
		group.PUT("/:id", handler.Update)
		group.DELETE("/:id", handler.Delete)
	}
}