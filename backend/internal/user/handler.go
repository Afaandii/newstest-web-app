package user

import (
	"net/http"
	"strconv"

	"newstest-app/internal/bootstrap"
	supabasepkg "newstest-app/pkg/supabase"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service Service
	cfg     *bootstrap.Config
}

func NewUserHandler(service Service, cfg *bootstrap.Config) *Handler {
	return &Handler{service: service, cfg: cfg}
}

func (h *Handler) GetAll(u *gin.Context) {
	usrs, err := h.service.GetAll()
	if err != nil {
		u.JSON(http.StatusInternalServerError, gin.H{"errors": err.Error()})
		return
	}

	u.JSON(http.StatusOK, gin.H{
		"message": "Get all data users successfully!",
		"datas":   usrs,
	})
}

func (h *Handler) GetByID(u *gin.Context) {
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
		"message": "Get data users by id successfully!",
		"datas":   usrs,
	})
}

func (h *Handler) Create(u *gin.Context) {
	roleID, err := strconv.ParseUint(u.PostForm("role_id"), 10, 64)
	if err != nil {
		u.JSON(http.StatusBadRequest, gin.H{"errors": "role_id harus berupa angka"})
		return
	}

	name := u.PostForm("name")
	email := u.PostForm("email")
	password := u.PostForm("password")
	nip := u.PostForm("nip")
	address := u.PostForm("address")

	// Avatar is optional
	avatarURL := ""
	file, header, err := u.Request.FormFile("avatar")
	if err == nil {
		// File provided – upload to Supabase
		url, uploadErr := supabasepkg.UploadAvatar(
			h.cfg.SupabaseURL,
			h.cfg.SupabaseKey,
			h.cfg.SupabaseBucketAvatar,
			file,
			header,
		)
		if uploadErr != nil {
			u.JSON(http.StatusInternalServerError, gin.H{"errors": "Gagal upload avatar: " + uploadErr.Error()})
			return
		}
		avatarURL = url
	}

	usrs, err := h.service.Create(
		uint(roleID),
		name,
		email,
		password,
		nip,
		address,
		avatarURL,
	)
	if err != nil {
		u.JSON(http.StatusForbidden, gin.H{"errors": err.Error()})
		return
	}

	u.JSON(http.StatusCreated, gin.H{
		"message": "Created users successfully!",
		"datas":   usrs,
	})
}

func (h *Handler) Update(u *gin.Context) {
	id, err := strconv.Atoi(u.Param("id"))
	if err != nil {
		u.JSON(http.StatusBadRequest, gin.H{"errors": "Invalid ID user!"})
		return
	}

	roleID, err := strconv.ParseUint(u.PostForm("role_id"), 10, 64)
	if err != nil {
		u.JSON(http.StatusBadRequest, gin.H{"errors": "role_id harus berupa angka"})
		return
	}

	name := u.PostForm("name")
	email := u.PostForm("email")
	password := u.PostForm("password")
	nip := u.PostForm("nip")
	address := u.PostForm("address")

	// Try to get a new avatar file
	newAvatarURL := ""
	hasNewAvatar := false
	file, header, err := u.Request.FormFile("avatar")
	if err == nil {
		hasNewAvatar = true
		url, uploadErr := supabasepkg.UploadAvatar(
			h.cfg.SupabaseURL,
			h.cfg.SupabaseKey,
			h.cfg.SupabaseBucketAvatar,
			file,
			header,
		)
		if uploadErr != nil {
			u.JSON(http.StatusInternalServerError, gin.H{"errors": "Gagal upload avatar: " + uploadErr.Error()})
			return
		}
		newAvatarURL = url
	}

	usrs, err := h.service.Update(
		uint(id),
		uint(roleID),
		name,
		email,
		password,
		nip,
		address,
		newAvatarURL,
		hasNewAvatar,
	)
	if err != nil {
		u.JSON(http.StatusBadRequest, gin.H{"errors": err.Error()})
		return
	}

	u.JSON(http.StatusOK, gin.H{
		"message": "Updated users successfully!",
		"datas":   usrs,
	})
}

func (h *Handler) Delete(u *gin.Context) {
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
