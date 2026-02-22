package permissions

import (
	"newstest-app/internal/shared/model"

	"gorm.io/gorm"
)

type PermissionRepository interface {
	FindAll() ([]model.Permission, error)
	FindByID(id uint) (*model.Permission, error)
	Create(p *model.Permission) error
	Update(p *model.Permission) error
	Delete(id uint) error
}

type permissionRepository struct {
	db *gorm.DB
}

func NewPermissionRepository(db *gorm.DB) PermissionRepository {
	return &permissionRepository{db}
}

func (r *permissionRepository) FindAll() ([]model.Permission, error) {
	var data []model.Permission
	err := r.db.Find(&data).Error
	return data, err
}

func (r *permissionRepository) FindByID(id uint) (*model.Permission, error) {
	var p model.Permission
	err := r.db.First(&p, "id_permissions = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (r *permissionRepository) Create(p *model.Permission) error {
	return r.db.Create(p).Error
}

func (r *permissionRepository) Update(p *model.Permission) error {
	return r.db.Save(p).Error
}

func (r *permissionRepository) Delete(id uint) error {
	return r.db.Delete(&model.Permission{}, "id_permissions = ?", id).Error
}
