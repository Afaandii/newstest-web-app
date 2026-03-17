package model

import "time"

type Comment struct {
	IDComment  uint      `json:"id_comment" gorm:"primaryKey;autoIncrement;column:id_comment"`
	UserRef    uint      `json:"user_id" gorm:"column:user_id"`
	PostRef    uint      `json:"post_id" gorm:"column:post_id"`
	Content    string    `json:"content" gorm:"type:varchar(255);column:content"`
	ParentID   *uint     `json:"parent_id" gorm:"column:parent_id"`
	LikesCount uint      `json:"likes_count" gorm:"column:likes_count"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
	Status     string    `json:"status" gorm:"type:status;default:active;column:status"`
	IsLiked    bool      `json:"is_liked" gorm:"-"`

	User   User     `gorm:"foreignKey:UserRef;references:IDUser"`
	Post   Post     `gorm:"foreignKey:PostRef;references:IDPost"`
	Parent *Comment `gorm:"foreignKey:ParentID;references:IDComment"`
}

func (Comment) TableName() string {
	return "comments"
}
