package rolepermissions

import (
	"newstest-app/internal/shared/model"

	"gorm.io/gorm"
)

type RolePermissionsRepository interface {
	FindByRoleID(roleID uint) ([]model.RolePermission, error)
	FindSpecific(roleID, permissionID uint) (*model.RolePermission, error)
	Create(rp *model.RolePermission) error
	Delete(id uint) error
}

type rolePermissionsRepository struct {
	db *gorm.DB
}

func NewRolePermissionsRepository(db *gorm.DB) RolePermissionsRepository {
	return &rolePermissionsRepository{db}
}

func (r *rolePermissionsRepository) FindByRoleID(roleID uint) ([]model.RolePermission, error) {
	var data []model.RolePermission
	err := r.db.Where("role_id = ?", roleID).Find(&data).Error
	return data, err
}

func (r *rolePermissionsRepository) FindSpecific(roleID, permissionID uint) (*model.RolePermission, error) {
	var data model.RolePermission
	err := r.db.Where("role_id = ? AND permission_id = ?", roleID, permissionID).First(&data).Error
	if err != nil {
		return nil, err
	}
	return &data, nil
}

func (r *rolePermissionsRepository) Create(rp *model.RolePermission) error {
	return r.db.Create(rp).Error
}

func (r *rolePermissionsRepository) Delete(id uint) error {
	return r.db.Delete(&model.RolePermission{}, id).Error
}
