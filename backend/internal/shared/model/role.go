package model

import (
	"time"
)

type Role struct {
	IDRole       uint      `json:"id_role" gorm:"primaryKey;autoIncrement;column:id_role"`
	Name     			string    `json:"name" gorm:"type:varchar(255);column:name"`
	HandleAccess string    `json:"handle_access" gorm:"type:varchar(255);column:handle_access"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`

	User           []User           `gorm:"foreignKey:RoleRef;references:IDRole"`
	RolePermission []RolePermission `gorm:"foreignKey:RoleRef;references:IDRole"`
}

func (Role) TableName() string {
	return "roles"
}
