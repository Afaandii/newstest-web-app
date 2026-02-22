package category

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service Service
}

func NewHandlerCategory(service Service) *Handler {
	return &Handler{service}
}

func (h *Handler) GetAll(c *gin.Context){
	categories, err := h.service.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error" : err.Error()})
		return 
	}
	c.JSON(http.StatusOK, gin.H{
		"status" : "success",
		"data" : categories,
	})
}

func (h *Handler) GetByID(c *gin.Context){
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID tidak valid!"})
		return 
	}

	categories, err := h.service.GetByID(uint(id))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Category not foud!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status" : "succees",
		"data" : categories,
	})
}

func (h *Handler) Create(c *gin.Context){
	var req struct{
		Name string `json:"name"`
		Description string `json:"description"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err.Error()})
		return
	}

	category, err := h.service.Create(req.Name, req.Description)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Create category successfully!",
		"data" : category,
	})
}

func (h *Handler) Update(c *gin.Context){
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": "ID tidak valid!"})
		return
	}

	var req struct{
		Name string `json:"name"`
		Description string `json:"description"`
	}

	if err := c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err.Error()})
		return
	}

	category, err := h.service.Update(uint(id), req.Name, req.Description)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err.Error()})
		return
	}

	c.JSON(http.StatusAccepted, gin.H{
		"message" : "Updated category successfully!",
		"data" : category,
	})
}

func (h *Handler) Delete(c *gin.Context){
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": "ID tidak valid!"})
		return
	}

	if err := h.service.Delete(uint(id)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Deleted category successfully!"})
}