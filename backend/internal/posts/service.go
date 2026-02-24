package posts

import "newstest-app/internal/shared/model"

type PostRequest struct {
	UserID     uint   `form:"user_id"`
	CategoryID uint   `form:"category_id"`
	Title      string `form:"title"`
	Slug       string `form:"slug"`
	Excerpt    string `form:"excerpt"`
	Content    string `form:"content"`
	Thumbnail  string `form:"thumbnail"`
}

type Service interface {
	GetAll() ([]model.Post, error)
	GetByID(id uint) (*model.Post, error)
	Create(req PostRequest) (*model.Post, error)
	Update(id uint, req PostRequest, hasNewThumbnail bool) (*model.Post, error)
	Delete(id uint) error
}

type service struct {
	repo PostRepository
}

func NewServicePost(repo PostRepository) Service {
	return &service{repo}
}

func (s *service) GetAll() ([]model.Post, error) {
	return s.repo.FindAll()
}

func (s *service) GetByID(id uint) (*model.Post, error) {
	return s.repo.FindByID(id)
}

func (s *service) Create(req PostRequest) (*model.Post, error) {
	p := &model.Post{
		UserRef:     req.UserID,
		CategoryRef: req.CategoryID,
		Title:       req.Title,
		Slug:        req.Slug,
		Excerpt:     req.Excerpt,
		Content:     req.Content,
		Thumbnail:   req.Thumbnail,
	}

	err := s.repo.Create(p)
	return p, err
}

func (s *service) Update(id uint, req PostRequest, hasNewThumbnail bool) (*model.Post, error) {
	p, err := s.repo.FindByID(id)
	if err != nil {
		return nil, err
	}

	p.UserRef = req.UserID
	p.CategoryRef = req.CategoryID
	p.Title = req.Title
	p.Slug = req.Slug
	p.Excerpt = req.Excerpt
	p.Content = req.Content

	// Only overwrite thumbnail if a new file was actually uploaded
	if hasNewThumbnail {
		p.Thumbnail = req.Thumbnail
	}

	err = s.repo.Update(p)
	return p, err
}

func (s *service) Delete(id uint) error {
	return s.repo.Delete(id)
}
