package category

import (
	"newstest-app/internal/shared/model"

	"gorm.io/gorm"
)

type CategoryRepository interface {
	FindAll() ([]model.Category, error)
	FindByID(id uint) (*model.Category, error)
	Create(c *model.Category) error
	Update(c *model.Category) error
	Delete(id uint) error
}

type categoryRepository struct{
	db *gorm.DB
}

func NewCategoryRepository(db *gorm.DB) CategoryRepository{
	return &categoryRepository{db}
}

func (r *categoryRepository) FindAll() ([]model.Category, error){
	var data []model.Category
	err := r.db.Find(&data).Error
	return data, err
}

func (r *categoryRepository) FindByID(id uint) (*model.Category, error){
	var c model.Category
	err := r.db.First(&c, "id_category = ?", id).Error
	if err != nil {
		return nil, err	
	}
	return &c, err
}

func (r *categoryRepository) Create(c *model.Category)error{
	return  r.db.Create(c).Error
}

func (r *categoryRepository) Update(c *model.Category) error{
	return r.db.Save(c).Error
}

func (r *categoryRepository) Delete(id uint) error{
	return r.db.Delete(&model.Category{}, "id_catagory = ?", id).Error
}