package user

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service Service
}

func NewUserHandler(service Service) *Handler {
	return &Handler{service}
}

func (h *Handler) GetAll(u *gin.Context){
	usrs, err := h.service.GetAll()
	if err != nil {
		u.JSON(http.StatusInternalServerError, gin.H{"errors": err.Error()})
		return
	}

	u.JSON(http.StatusOK, gin.H{
		"message" : "Get all data users successfully!",
		"datas" : usrs,
	})
}

func (h *Handler) GetByID(u *gin.Context){
	id, err := strconv.Atoi(u.Param("id"))
	if err != nil {
		u.JSON(http.StatusBadRequest, gin.H{"errors": "Invalid ID User!"})
		return
	}

	usrs, err := h.service.GetByID(uint(id))
	if err != nil {
		u.JSON(http.StatusBadRequest, gin.H{"errors": err.Error()})
		return
	}

	u.JSON(http.StatusOK, gin.H{
		"message" : "Get data users by id successfully!",
		"datas" : usrs,
	})
}

func (h *Handler) Create(u *gin.Context){
	var req struct{
		RoleID uint `json:"role_id"`
		Name string `json:"name"`
		Email string `json:"email"`
		Password string `json:"password"`
		Nip string `json:"nip"`
		Address string `json:"address"`
		Avatar string `json:"avatar"`
	}

	if err := u.ShouldBind(&req); err != nil{
		u.JSON(http.StatusBadRequest, gin.H{"errors": err.Error()})
		return
	}

	usrs, err := h.service.Create(
		req.RoleID,
		req.Name,
		req.Email,
		req.Password,
		req.Nip,
		req.Address,
		req.Avatar,
	)
	
	if err != nil {
		u.JSON(http.StatusForbidden, gin.H{"errors": err.Error()})
		return
	}

	u.JSON(http.StatusCreated, gin.H{
		"message": "Created users successfully!",
		"datas": usrs,
	})
}

func (h *Handler) Update(u *gin.Context){
	id, err := strconv.Atoi(u.Param("id"))
	if err != nil {
		u.JSON(http.StatusForbidden, gin.H{"errors": "Invalid ID user!"})
		return
	}

	var req struct{
		RoleID uint `json:"role_id"`
		Name string `json:"name"`
		Email string `json:"email"`
		Password string `json:"password"`
		Nip string `json:"nip"`
		Address string `json:"address"`
		Avatar string `json:"avatar"`
	}

	if err := u.ShouldBind(&req); err != nil {
		u.JSON(http.StatusForbidden, gin.H{"errors": err.Error()})
		return
	}

	usrs, err := h.service.Update(
		uint(id),
		req.RoleID,
		req.Name,
		req.Email,
		req.Password,
		req.Nip,
		req.Address,
		req.Avatar,
	)

	if err != nil{
		u.JSON(http.StatusBadRequest, gin.H{"errors": err.Error()})
		return
	}

	u.JSON(http.StatusOK, gin.H{
		"message":"Updated users successfully!",
		"datas": usrs,
	})
}

func (h *Handler) Delete(u *gin.Context){
	id, err := strconv.Atoi(u.Param("id"))
	if err != nil {
		u.JSON(http.StatusBadRequest, gin.H{"errors": "Invalid ID User!"})
		return
	}

	err = h.service.Delete(uint(id))
	if err != nil {
		u.JSON(http.StatusForbidden, gin.H{"errors": err.Error()})
		return
	}

	u.JSON(http.StatusOK, gin.H{"message": "Deleted users successfully!"})
}