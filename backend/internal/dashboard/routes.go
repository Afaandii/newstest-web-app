package dashboard

import (
	"newstest-app/internal/bootstrap"
	"newstest-app/pkg/middleware"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutesDashboard(r *gin.Engine, db *gorm.DB, cfg *bootstrap.Config) {
	repo := NewDashboardRepository(db)
	service := NewDashboardService(repo)
	handler := NewDashboardHandler(service)

	group := r.Group("/v1/admin/dashboard")
	group.Use(middleware.AuthMiddleware(cfg))
	{
		group.GET("/stats", handler.GetStats)
	}
}
