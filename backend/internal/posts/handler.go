package posts

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service Service
}

func NewHandlerPost(service Service) *Handler {
	return &Handler{service}
}

func (h *Handler) GetAll(c *gin.Context) {
	posts, err := h.service.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   posts,
	})
}

func (h *Handler) GetByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID tidak valid!"})
		return
	}

	post, err := h.service.GetByID(uint(id))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Post not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   post,
	})
}

func (h *Handler) Create(c *gin.Context) {
	var req PostRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err.Error()})
		return
	}

	post, err := h.service.Create(req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Create post successfully!",
		"data":    post,
	})
}

func (h *Handler) Update(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": "ID tidak valid!"})
		return
	}

	var req PostRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err.Error()})
		return
	}

	post, err := h.service.Update(uint(id), req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err.Error()})
		return
	}

	c.JSON(http.StatusAccepted, gin.H{
		"message": "Updated post successfully!",
		"data":    post,
	})
}

func (h *Handler) Delete(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": "ID tidak valid!"})
		return
	}

	if err := h.service.Delete(uint(id)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Deleted post successfully!"})
}
