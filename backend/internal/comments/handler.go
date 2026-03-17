package comments

import (
	"net/http"
	"newstest-app/internal/shared/model"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CommentHandler struct {
	service CommentService
}

func NewCommentHandler(service CommentService) *CommentHandler {
	return &CommentHandler{service}
}

func (h *CommentHandler) GetCommentsByPost(c *gin.Context) {
	id := c.Param("id")
	postID, _ := strconv.Atoi(id)

	// Optional: Get userID to check current user's likes
	var userID uint
	if uID := c.Query("user_id"); uID != "" {
		parsedUID, _ := strconv.Atoi(uID)
		userID = uint(parsedUID)
	}

	comments, err := h.service.GetCommentsByPost(uint(postID), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": comments})
}

func (h *CommentHandler) CreateComment(c *gin.Context) {
	postID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID"})
		return
	}

	var input struct {
		UserID   uint   `json:"user_id" binding:"required"`
		Content  string `json:"content" binding:"required"`
		ParentID *uint  `json:"parent_id"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	comment := model.Comment{
		PostRef:  uint(postID),
		UserRef:  input.UserID,
		Content:  input.Content,
		ParentID: input.ParentID,
		Status:   "active",
	}

	if err := h.service.CreateComment(&comment); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": comment})
}

func (h *CommentHandler) ToggleLike(c *gin.Context) {
	commentID, err := strconv.ParseUint(c.Param("comment_id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid comment ID"})
		return
	}

	var input struct {
		UserID uint `json:"user_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	isLiked, err := h.service.ToggleLike(uint(commentID), input.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	status := "unliked"
	if isLiked {
		status = "liked"
	}

	c.JSON(http.StatusOK, gin.H{"status": status})
}