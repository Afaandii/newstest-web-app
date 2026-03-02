package rolepermissions

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service Service
}

func NewHandlerRolePermissions(service Service) *Handler {
	return &Handler{service}
}

func (h *Handler) GetByRoleID(c *gin.Context) {
	roleID, err := strconv.Atoi(c.Param("roleId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Role ID"})
		return
	}

	data, err := h.service.GetByRoleID(uint(roleID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   data,
	})
}

func (h *Handler) Toggle(c *gin.Context) {
	var req struct {
		RoleID       uint `json:"role_id" binding:"required"`
		PermissionID uint `json:"permission_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.service.Toggle(req.RoleID, req.PermissionID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Permission toggled successfully",
	})
}
