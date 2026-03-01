package auth

import (
	"newstest-app/internal/shared/model"

	"gorm.io/gorm"
)

type AuthRepository interface {
	FindByEmail(email string) (*model.User, error)
	Create(user *model.User) error
	UpdateRememberToken(id uint, token string) error
}

type authRepository struct {
	db *gorm.DB
}

func NewAuthRepository(db *gorm.DB) AuthRepository {
	return &authRepository{db}
}

func (r *authRepository) FindByEmail(email string) (*model.User, error) {
	var user model.User
	err := r.db.Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *authRepository) Create(user *model.User) error {
	return r.db.Create(user).Error
}

func (r *authRepository) UpdateRememberToken(id uint, token string) error {
	return r.db.Model(&model.User{}).Where("id_user = ?", id).Update("remember_tokens", token).Error
}
