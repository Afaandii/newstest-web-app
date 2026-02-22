package role

import (
	"newstest-app/internal/shared/model"

	"gorm.io/gorm"
)

type RoleRepository interface {
	FindAll() ([]model.Role, error)
	FindByID(id uint) (*model.Role, error)
	Create(r *model.Role) error
	Update(r *model.Role) error
	Delete(id uint) error
}

type roleRepository struct{
	db *gorm.DB
}

func NewRoleRepository(db *gorm.DB) RoleRepository{
	return &roleRepository{db}
}

func (r *roleRepository) FindAll() ([]model.Role, error){
	var data []model.Role
	err := r.db.Find(&data).Error
	return data, err
}

func (r *roleRepository) FindByID(id uint) (*model.Role, error){
	var data model.Role
	err := r.db.First(&data, "id_role = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &data, err
}

func (r *roleRepository) Create(rol *model.Role) error{
	return r.db.Create(rol).Error
}

func (r *roleRepository) Update(rol *model.Role) error{
	return r.db.Save(rol).Error
}

func (r *roleRepository) Delete(id uint) error{
	return r.db.Delete(&model.Role{}, "id_role = ?", id).Error
}