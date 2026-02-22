package permissions

import "newstest-app/internal/shared/model"

type Service interface {
	GetAll() ([]model.Permission, error)
	GetByID(id uint) (*model.Permission, error)
	Create(name string) (*model.Permission, error)
	Update(id uint, name string) (*model.Permission, error)
	Delete(id uint) error
}

type service struct {
	repo PermissionRepository
}

func NewServicePermissions(repo PermissionRepository) Service {
	return &service{repo}
}

func (s *service) GetAll() ([]model.Permission, error) {
	return s.repo.FindAll()
}

func (s *service) GetByID(id uint) (*model.Permission, error) {
	return s.repo.FindByID(id)
}

func (s *service) Create(name string) (*model.Permission, error) {
	p := &model.Permission{
		Name: name,
	}

	err := s.repo.Create(p)
	return p, err
}

func (s *service) Update(id uint, name string) (*model.Permission, error) {
	p, err := s.repo.FindByID(id)
	if err != nil {
		return nil, err
	}

	p.Name = name
	err = s.repo.Update(p)
	return p, err
}

func (s *service) Delete(id uint) error {
	return s.repo.Delete(id)
}
