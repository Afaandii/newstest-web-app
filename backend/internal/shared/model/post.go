package model

import "time"

type Post struct {
	IDPost      uint      `json:"id_post" gorm:"primaryKey;autoIncrement;column:id_post"`
	UserRef     uint      `json:"user_id" gorm:"column:user_id"`
	CategoryRef uint      `json:"category_id" gorm:"column:category_id"`
	Title       string    `json:"title" gorm:"type:varchar(100);column:title"`
	Slug        string    `json:"slug" gorm:"type:varchar(100);column:slug"`
	Excerpt     string    `json:"excerpt" gorm:"type:varchar(120);column:excerpt"`
	Content     string    `json:"content" gorm:"type:text;column:content"`
	Thumbnail   string    `json:"thumbnail" gorm:"type:text;column:thumbnail"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`

	User     User      `gorm:"foreignKey:UserRef;references:IDUser"`
	Category Category  `gorm:"foreignKey:CategoryRef;references:IDCategory"`
	Comments []Comment `gorm:"foreignKey:PostRef;references:IDPost"`
}

func (Post) TableName() string {
	return "posts"
}
