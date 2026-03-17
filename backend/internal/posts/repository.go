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
	Search(query string, sortBy string, limit, offset int) ([]model.Post, int64, error)
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
	return r.db.Omit("Category", "User").Save(p).Error
}

func (r *postRepository) Delete(id uint) error {
	return r.db.Delete(&model.Post{}, "id_post = ?", id).Error
}

func (r *postRepository) Search(query string, sortBy string, limit, offset int) ([]model.Post, int64, error) {
	var data []model.Post
	var total int64
	
	errChan := make(chan error, 2)
	
	// Define sorting
	orderClause := "created_at DESC"
	if sortBy == "relevancy" {
		// Use ts_rank for PostgreSQL Full Text Search relevancy
		// We use plainto_tsquery for the search query
		orderClause = "ts_rank(to_tsvector('indonesian', title || ' ' || content), plainto_tsquery('indonesian', '" + query + "')) DESC"
	}

	// Query for data
	go func() {
		err := r.db.Model(&model.Post{}).
			Preload("User").
			Preload("Category").
			Where("title LIKE ? OR content LIKE ?", "%"+query+"%", "%"+query+"%").
			Limit(limit).
			Offset(offset).
			Order(orderClause).
			Find(&data).Error
		errChan <- err
	}()
	
	// Query for total count
	go func() {
		err := r.db.Model(&model.Post{}).
			Where("title LIKE ? OR content LIKE ?", "%"+query+"%", "%"+query+"%").
			Count(&total).Error
		errChan <- err
	}()
	
	// Wait for both results
	for i := 0; i < 2; i++ {
		if err := <-errChan; err != nil {
			return nil, 0, err
		}
	}
	
	return data, total, nil
}
