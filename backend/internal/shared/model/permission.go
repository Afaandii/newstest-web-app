package model

import "time"

type Permission struct {
	IDPermissions uint      `json:"id_permissions" gorm:"primaryKey;autoIncrement;column:id_permissions"`
	Name          string    `json:"name" gorm:"type:varchar(255);column:name"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`

	RolePermissions []RolePermission `gorm:"foreignKey:PermissionRef;references:IDPermissions"`
}

func (Permission) TableName() string {
	return "permissions"
}
