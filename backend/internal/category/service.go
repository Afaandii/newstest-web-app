package category

import "newstest-app/internal/shared/model"

type Service interface {
	GetAll() ([]model.Category, error)
	GetByID(id uint) (*model.Category, error)
	Create(name, description string) (*model.Category, error)
	Update(id uint, name, description string) (*model.Category, error)
	Delete(id uint) error
}

type service struct{
	repo CategoryRepository
}

func NewServiceCategory(repo CategoryRepository) Service{
	return &service{repo}
}

func (s *service) GetAll() ([]model.Category, error){
	return s.repo.FindAll()
}

func (s *service) GetByID(id uint) (*model.Category, error){
	return s.repo.FindByID(id)
}

func (s *service) Create(name, description string) (*model.Category, error){
	c := &model.Category{
		Name: name,
		Description: description,
	}

	err := s.repo.Create(c)
	return c, err
}

func (s *service) Update(id uint, name, description string) (*model.Category, error){
	c, err := s.repo.FindByID(id)
	if err != nil {
		return nil, err
	}

	c.Name = name
	c.Description = description
	err = s.repo.Update(c)
	return c, err
}

func (s *service) Delete(id uint) error{
	return s.repo.Delete(id)
}