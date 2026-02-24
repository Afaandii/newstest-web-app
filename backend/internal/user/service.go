package user

import (
	"newstest-app/internal/shared/model"
	"newstest-app/pkg/security"
)

type Service interface {
	GetAll() ([]model.User, error)
	GetByID(id uint) (*model.User, error)
	Create(role_id uint, name, email, password, nip, address, avatar string) (*model.User, error)
	Update(id uint, role_id uint, name, email, password, nip, address, avatar string, hasNewAvatar bool) (*model.User, error)
	Delete(id uint) error
}

type service struct {
	repo UserRepository
}

func NewUserService(repo UserRepository) Service {
	return &service{repo}
}

func (s *service) GetAll() ([]model.User, error) {
	return s.repo.FindAll()
}

func (s *service) GetByID(id uint) (*model.User, error) {
	return s.repo.FindByID(id)
}

func (s *service) Create(role_id uint, name, email, password, nip, address, avatar string) (*model.User, error) {
	hashed, err := security.HashPassword(password)
	if err != nil {
		return nil, err
	}

	u := &model.User{
		RoleRef:  role_id,
		Name:     name,
		Email:    email,
		Password: hashed,
		Nip:      nip,
		Address:  address,
		Avatar:   avatar,
	}

	err = s.repo.Create(u)
	if err != nil {
		return nil, err
	}

	return u, nil
}

func (s *service) Update(id uint, role_id uint, name, email, password, nip, address, avatar string, hasNewAvatar bool) (*model.User, error) {
	u, err := s.repo.FindByID(id)
	if err != nil {
		return nil, err
	}

	u.RoleRef = role_id
	u.Name = name
	u.Email = email
	u.Nip = nip
	u.Address = address

	// Only update avatar if a new file was actually uploaded
	if hasNewAvatar {
		u.Avatar = avatar
	}

	// Only re-hash password if a new one was provided
	if password != "" {
		hashed, err := security.HashPassword(password)
		if err != nil {
			return nil, err
		}
		u.Password = hashed
	}

	err = s.repo.Update(u)
	if err != nil {
		return nil, err
	}

	return u, nil
}

func (s *service) Delete(id uint) error {
	return s.repo.Delete(id)
}
