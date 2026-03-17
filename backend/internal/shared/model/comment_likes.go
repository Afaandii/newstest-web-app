package model

import "time"

type CommentLikes struct {
	IDLike     uint      `json:"id_like" gorm:"primaryKey;autoIncrement;column:id_like"`
	CommentRef uint      `json:"comment_id" gorm:"column:comment_id"`
	UserRef    uint      `json:"user_id" gorm:"column:user_id"`
	CreatedAt  time.Time `json:"created_at"`

	Comment Comment `gorm:"foreignKey:CommentRef;references:IDComment"`
	User    User    `gorm:"foreignKey:UserRef;references:IDUser"`
}

func (CommentLikes) TableName() string {
	return "comment_likes"
}
