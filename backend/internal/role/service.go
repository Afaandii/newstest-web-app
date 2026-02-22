package role

import "newstest-app/internal/shared/model"

type Service interface {
	GetAll() ([]model.Role, error)
	GetByID(id uint) (*model.Role, error)
	Create(name, handleAccess string) (*model.Role, error)
	Update(id uint, name, handleAccess string) (*model.Role, error)
	Delete(id uint) error
}

type service struct {
	repo RoleRepository
}

func NewServiceRole(repo RoleRepository) Service {
	return &service{repo}
}

func (s *service) GetAll() ([]model.Role, error) {
	return s.repo.FindAll()
}

func (s *service) GetByID(id uint) (*model.Role, error) {
	return s.repo.FindByID(id)
}

func (s *service) Create(name, handleAccess string) (*model.Role, error) {
	r := &model.Role{
		Name:         name,
		HandleAccess: handleAccess,
	}

	err := s.repo.Create(r)
	return r, err
}

func (s *service) Update(id uint, name, handleAccess string) (*model.Role, error) {
	r, err := s.repo.FindByID(id)
	if err != nil {
		return nil, err
	}

	r.Name = name
	r.HandleAccess = handleAccess
	err = s.repo.Update(r)
	return r, err
}

func (s *service) Delete(id uint) error {
	return s.repo.Delete(id)
}
