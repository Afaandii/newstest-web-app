package user

import (
	"newstest-app/internal/shared/model"

	"gorm.io/gorm"
)

type UserRepository interface {
	FindAll() ([]model.User,error)
	FindByID(id uint) (*model.User, error)
	Create(u *model.User) error
	Update(u *model.User) error
	Delete(id uint) error
}

type userRepository struct{
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository{
	return &userRepository{db}
}

func (r *userRepository) FindAll() ([]model.User, error){
	var data []model.User
	err := r.db.Find(&data).Error
	if err != nil {
		return nil,err
	}

	return data, err
}

func (r *userRepository) FindByID(id uint) (*model.User, error){
	var data model.User
	err := r.db.First(&data, "id_user = ?", id).Error
	if err != nil {
		return nil, err
	}

	return &data,err
}

func (r *userRepository) Create(u *model.User) error{
	return r.db.Create(u).Error
}

func (r *userRepository) Update(u *model.User) error{
	return r.db.Save(u).Error
}

func (r *userRepository) Delete(id uint) error{
	return r.db.Delete(&model.User{}, "id_user = ?", id).Error
}