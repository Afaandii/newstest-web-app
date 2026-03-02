package rolepermissions

import (
	"newstest-app/internal/shared/model"
)

type Service interface {
	GetByRoleID(roleID uint) ([]model.RolePermission, error)
	Toggle(roleID, permissionID uint) error
}

type service struct {
	repo RolePermissionsRepository
}

func NewServiceRolePermissions(repo RolePermissionsRepository) Service {
	return &service{repo}
}

func (s *service) GetByRoleID(roleID uint) ([]model.RolePermission, error) {
	return s.repo.FindByRoleID(roleID)
}

func (s *service) Toggle(roleID, permissionID uint) error {
	// Check if already exists
	rp, err := s.repo.FindSpecific(roleID, permissionID)
	if err == nil && rp != nil {
		// If exists, delete it (uncheck)
		return s.repo.Delete(rp.IDRolePermission)
	}

	// If not exists, create it (check)
	newRP := &model.RolePermission{
		RoleRef:       roleID,
		PermissionRef: permissionID,
	}
	return s.repo.Create(newRP)
}
