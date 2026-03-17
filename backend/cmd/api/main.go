package main

import (
	"fmt"
	"log"
	"net/http"
	"newstest-app/internal/auth"
	"newstest-app/internal/bootstrap"
	"newstest-app/internal/category"
	"newstest-app/internal/dashboard"
	"newstest-app/internal/permissions"
	"newstest-app/internal/posts"
	"newstest-app/internal/role"
	rolepermissions "newstest-app/internal/rolePermissions"
	"newstest-app/internal/user"
	"newstest-app/internal/comments"

	"newstest-app/pkg/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	cfg := bootstrap.LoadConfig()
	db, err := bootstrap.Conn(cfg)
	if err != nil {
		log.Fatal("db connect:", err)
	}

	bootstrap.AutoMigrate(db)
	r := gin.Default()

	r.Use(middleware.CORSMiddleware())

	category.RegisterRoutesCategory(r, db)
	role.RegisterRoutesRole(r, db)
	rolepermissions.RegisterRoutesRolePermissions(r, db)
	permissions.RegisterRoutesPermissions(r, db)
	posts.RegisterRoutesPosts(r, db, cfg)
	user.RegisterRouteUser(r, db, cfg)
	auth.RegisterRoutesAuth(r, db, cfg)
	dashboard.RegisterRoutesDashboard(r, db, cfg)
	comments.RegisterRoutesComments(r, db, cfg)

	if cfg.PORT == "" {
		cfg.PORT = "8080"
	}

	fmt.Println("Server running on port", cfg.PORT)
	log.Fatal(http.ListenAndServe(":"+cfg.PORT, r))
}
