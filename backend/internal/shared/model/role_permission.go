package model

import "time"

type RolePermission struct {
	IDRolePermission uint      `json:"id_role_permission" gorm:"primaryKey;autoIncrement;column:id_role_permission"`
	RoleRef           uint      `json:"role_id" gorm:"column:role_id"`
	PermissionRef     uint      `json:"permission_id" gorm:"column:permission_id"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`

	Role       Role       `gorm:"foreignKey:RoleRef;references:IDRole"`
	Permission Permission `gorm:"foreignKey:PermissionRef;references:IDPermissions"`
}

func (RolePermission) TableName() string {
	return "role_permissions"
}
