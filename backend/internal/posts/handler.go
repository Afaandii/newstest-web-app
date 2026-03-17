package posts

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

func NewHandlerPost(service Service, cfg *bootstrap.Config) *Handler {
	return &Handler{service: service, cfg: cfg}
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
	userID, err := strconv.ParseUint(c.PostForm("user_id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": "user_id harus berupa angka"})
		return
	}
	categoryID, err := strconv.ParseUint(c.PostForm("category_id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": "category_id harus berupa angka"})
		return
	}

	title := c.PostForm("title")
	slug := c.PostForm("slug")
	excerpt := c.PostForm("excerpt")
	content := c.PostForm("content")

	// Thumbnail is optional
	thumbnailURL := ""
	file, header, err := c.Request.FormFile("thumbnail")
	if err == nil {
		url, uploadErr := supabasepkg.UploadThumbnail(
			h.cfg.SupabaseURL,
			h.cfg.SupabaseKey,
			h.cfg.SupabaseBucketThumbnail,
			file,
			header,
		)
		if uploadErr != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"errors": "Gagal upload thumbnail: " + uploadErr.Error()})
			return
		}
		thumbnailURL = url
	}

	req := PostRequest{
		UserID:     uint(userID),
		CategoryID: uint(categoryID),
		Title:      title,
		Slug:       slug,
		Excerpt:    excerpt,
		Content:    content,
		Thumbnail:  thumbnailURL,
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

	userID, err := strconv.ParseUint(c.PostForm("user_id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": "user_id harus berupa angka"})
		return
	}
	categoryID, err := strconv.ParseUint(c.PostForm("category_id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": "category_id harus berupa angka"})
		return
	}

	title := c.PostForm("title")
	slug := c.PostForm("slug")
	excerpt := c.PostForm("excerpt")
	content := c.PostForm("content")

	// Try to get a new thumbnail file
	newThumbnailURL := ""
	hasNewThumbnail := false
	file, header, err := c.Request.FormFile("thumbnail")
	if err == nil {
		hasNewThumbnail = true
		url, uploadErr := supabasepkg.UploadThumbnail(
			h.cfg.SupabaseURL,
			h.cfg.SupabaseKey,
			h.cfg.SupabaseBucketThumbnail,
			file,
			header,
		)
		if uploadErr != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"errors": "Gagal upload thumbnail: " + uploadErr.Error()})
			return
		}
		newThumbnailURL = url
	}

	req := PostRequest{
		UserID:     uint(userID),
		CategoryID: uint(categoryID),
		Title:      title,
		Slug:       slug,
		Excerpt:    excerpt,
		Content:    content,
		Thumbnail:  newThumbnailURL,
	}

	post, err := h.service.Update(uint(id), req, hasNewThumbnail)
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

func (h *Handler) Search(c *gin.Context) {
	query := c.Query("q")
	sortBy := c.DefaultQuery("sort", "newest")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	if page < 1 {
		page = 1
	}
	if limit < 1 {
		limit = 10
	}

	offset := (page - 1) * limit

	posts, total, err := h.service.Search(query, sortBy, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   posts,
		"meta": gin.H{
			"total": total,
			"page":  page,
			"limit": limit,
		},
	})
}
