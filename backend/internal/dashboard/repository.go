package dashboard

import (
	"newstest-app/internal/shared/model"

	"gorm.io/gorm"
)

type DashboardRepository interface {
	CountUsers() (int64, error)
	CountPosts() (int64, error)
	GetRecentPosts(limit int) ([]map[string]interface{}, error)
	GetTopCategories() ([]map[string]interface{}, error)
}

type dashboardRepository struct {
	db *gorm.DB
}

func NewDashboardRepository(db *gorm.DB) DashboardRepository {
	return &dashboardRepository{db}
}

func (r *dashboardRepository) CountUsers() (int64, error) {
	var count int64
	err := r.db.Model(&model.User{}).Count(&count).Error
	return count, err
}

func (r *dashboardRepository) CountPosts() (int64, error) {
	var count int64
	err := r.db.Model(&model.Post{}).Count(&count).Error
	return count, err
}

func (r *dashboardRepository) GetRecentPosts(limit int) ([]map[string]interface{}, error) {
	var posts []map[string]interface{}
	err := r.db.Model(&model.Post{}).
		Select("posts.id_post, posts.title, users.name as author, posts.created_at").
		Joins("left join users on users.id_user = posts.user_id").
		Order("posts.created_at desc").
		Limit(limit).
		Find(&posts).Error
	return posts, err
}

func (r *dashboardRepository) GetTopCategories() ([]map[string]interface{}, error) {
	var categories []map[string]interface{}
	err := r.db.Model(&model.Category{}).
		Select("categories.name, count(posts.id_post) as count").
		Joins("left join posts on posts.category_id = categories.id_category").
		Group("categories.id_category").
		Order("count desc").
		Limit(4).
		Find(&categories).Error
	return categories, err
}
