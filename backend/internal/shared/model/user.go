package model

import (
	"time"
)

type User struct {
	IDUser        uint      `json:"id_user" gorm:"primaryKey;autoIncrement;column:id_user"`
	RoleRef       uint      `json:"role_id" gorm:"column:role_id"`
	Name          string    `json:"name" gorm:"type:varchar(255);column:name"`
	Email         string    `json:"email" gorm:"type:varchar(255);column:email"`
	Password      string    `json:"password" gorm:"type:varchar(255);column:password"`
	Nip           string    `json:"nip" gorm:"type:varchar(255);column:nip"`
	Address       string    `json:"address" gorm:"type:varchar(255);column:address"`
	Avatar        string    `json:"avatar" gorm:"type:text;column:avatar"`
	RememberToken string    `json:"remember_tokens" gorm:"type:varchar(255);column:remember_tokens"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`

	Role     Role      `gorm:"foreignKey:RoleRef;references:IDRole"`
	Comments []Comment `gorm:"foreignKey:UserRef;references:IDUser"`
	Post     []Post    `gorm:"foreignKey:UserRef;references:IDUser"`
}

func (User) TableName() string {
	return "users"
}
