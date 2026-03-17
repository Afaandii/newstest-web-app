package comments

import (
	"newstest-app/internal/shared/model"

	"gorm.io/gorm"
)

type CommentRepository interface {
	Create(comment *model.Comment) error
	FindCommentsByPostID(postID uint) ([]model.Comment, error)
	FindCommentByID(commentID uint) (*model.Comment, error)
	CreateLike(like *model.CommentLikes) error
	DeleteLike(commentID, userID uint) error
	HasUserLikedComment(commentID, userID uint) (bool, error)
	GetLikedCommentIDs(userID uint, commentIDs []uint) (map[uint]bool, error)
}

type commentRepository struct {
	db *gorm.DB
}

func NewCommentRepository(db *gorm.DB) CommentRepository {
	return &commentRepository{db}
}

func (r *commentRepository) Create(comment *model.Comment) error {
	return r.db.Create(comment).Error
}

func (r *commentRepository) FindCommentsByPostID(postID uint) ([]model.Comment, error) {
	var comments []model.Comment
	// We only find active comments. We preload the User for avatar and name.
	// Replies (parent_id != 0) will be handled in the service or by fetching all and nesting.
	// For now, let's fetch all active comments for this post.
	err := r.db.Preload("User").
		Where("post_id = ? AND status = ?", postID, "active").
		Order("created_at ASC").
		Find(&comments).Error
	return comments, err
}

func (r *commentRepository) FindCommentByID(commentID uint) (*model.Comment, error) {
	var comment model.Comment
	err := r.db.First(&comment, "id_comment = ?", commentID).Error
	if err != nil {
		return nil, err
	}
	return &comment, nil
}

func (r *commentRepository) CreateLike(like *model.CommentLikes) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(like).Error; err != nil {
			return err
		}
		// Increment likes_count on the comment
		return tx.Model(&model.Comment{}).Where("id_comment = ?", like.CommentRef).
			UpdateColumn("likes_count", gorm.Expr("likes_count + ?", 1)).Error
	})
}

func (r *commentRepository) DeleteLike(commentID, userID uint) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		result := tx.Delete(&model.CommentLikes{}, "comment_id = ? AND user_id = ?", commentID, userID)
		if result.Error != nil {
			return result.Error
		}
		if result.RowsAffected > 0 {
			// Decrement likes_count on the comment
			return tx.Model(&model.Comment{}).Where("id_comment = ?", commentID).
				UpdateColumn("likes_count", gorm.Expr("likes_count - ?", 1)).Error
		}
		return nil
	})
}

func (r *commentRepository) HasUserLikedComment(commentID, userID uint) (bool, error) {
	var count int64
	err := r.db.Model(&model.CommentLikes{}).
		Where("comment_id = ? AND user_id = ?", commentID, userID).
		Count(&count).Error
	return count > 0, err
}

func (r *commentRepository) GetLikedCommentIDs(userID uint, commentIDs []uint) (map[uint]bool, error) {
	var likedIDs []uint
	err := r.db.Model(&model.CommentLikes{}).
		Where("user_id = ? AND comment_id IN ?", userID, commentIDs).
		Pluck("comment_id", &likedIDs).Error

	if err != nil {
		return nil, err
	}

	result := make(map[uint]bool)
	for _, id := range likedIDs {
		result[id] = true
	}
	return result, nil
}