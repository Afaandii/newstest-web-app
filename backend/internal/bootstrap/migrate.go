package bootstrap

import (
	"newstest-app/internal/shared/model"

	"gorm.io/gorm"
)

func AutoMigrate(db *gorm.DB){
	db.AutoMigrate(
		&model.Role{},
		&model.Permission{},
		&model.Category{},
		&model.User{},
		&model.Post{},
		&model.RolePermission{},
		&model.Comment{},
	)
}