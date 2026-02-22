package posts

import (
	"newstest-app/internal/shared/model"

	"gorm.io/gorm"
)

type PostRepository interface {
	FindAll() ([]model.Post, error)
	FindByID(id uint) (*model.Post, error)
	Create(p *model.Post) error
	Update(p *model.Post) error
	Delete(id uint) error
}

type postRepository struct {
	db *gorm.DB
}

func NewPostRepository(db *gorm.DB) PostRepository {
	return &postRepository{db}
}

func (r *postRepository) FindAll() ([]model.Post, error) {
	var data []model.Post
	err := r.db.Preload("User").Preload("Category").Find(&data).Error
	return data, err
}

func (r *postRepository) FindByID(id uint) (*model.Post, error) {
	var p model.Post
	err := r.db.Preload("User").Preload("Category").First(&p, "id_post = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (r *postRepository) Create(p *model.Post) error {
	return r.db.Create(p).Error
}

func (r *postRepository) Update(p *model.Post) error {
	return r.db.Save(p).Error
}

func (r *postRepository) Delete(id uint) error {
	return r.db.Delete(&model.Post{}, "id_post = ?", id).Error
}
