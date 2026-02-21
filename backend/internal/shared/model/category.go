package model

import (
	"time"
)

type Category struct {
	IDCategory   uint      `json:"id_category" gorm:"primaryKey;autoIncrement;column:id_category"`
	Name 				 string    `json:"name" gorm:"type:varchar(255);column:name"`
	Description  string    `json:"description" gorm:"type:varchar(255);column:description"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`

	Post []Post `gorm:"foreignKey:CategoryRef;references:IDCategory"`
}

func (Category) TableName() string {
	return "categories"
}
