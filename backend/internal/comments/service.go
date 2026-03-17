package comments

import (
	"newstest-app/internal/shared/model"
)

type CommentService interface {
	CreateComment(comment *model.Comment) error
	GetCommentsByPost(postID uint, userID uint) ([]model.Comment, error)
	ToggleLike(commentID, userID uint) (bool, error) // Returns true if liked, false if unliked
}

type commentService struct {
	repo CommentRepository
}

func NewCommentService(repo CommentRepository) CommentService {
	return &commentService{repo}
}

func (s *commentService) CreateComment(comment *model.Comment) error {
	// Default status is already active in DB/Model, but let's be explicit if needed.
	if comment.Status == "" {
		comment.Status = "active"
	}
	return s.repo.Create(comment)
}

func (s *commentService) GetCommentsByPost(postID uint, userID uint) ([]model.Comment, error) {
	// Step 1: Get all active comments for the post
	allComments, err := s.repo.FindCommentsByPostID(postID)
	if err != nil {
		return nil, err
	}

	// Step 2: If user is logged in, check which comments they liked
	if userID > 0 && len(allComments) > 0 {
		commentIDs := make([]uint, len(allComments))
		for i, c := range allComments {
			commentIDs[i] = c.IDComment
		}

		likedMap, err := s.repo.GetLikedCommentIDs(userID, commentIDs)
		if err == nil {
			for i := range allComments {
				if likedMap[allComments[i].IDComment] {
					allComments[i].IsLiked = true
				}
			}
		}
	}

	return allComments, nil
}

func (s *commentService) ToggleLike(commentID, userID uint) (bool, error) {
	liked, err := s.repo.HasUserLikedComment(commentID, userID)
	if err != nil {
		return false, err
	}

	if liked {
		err = s.repo.DeleteLike(commentID, userID)
		return false, err
	} else {
		err = s.repo.CreateLike(&model.CommentLikes{
			CommentRef: commentID,
			UserRef:    userID,
		})
		return true, err
	}
}