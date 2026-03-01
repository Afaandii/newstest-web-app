package auth

import (
	"errors"
	"newstest-app/internal/bootstrap"
	"newstest-app/internal/shared/model"
	"newstest-app/pkg/jwt"
	"newstest-app/pkg/security"
)

type Service interface {
	Register(name, email, password, nip, address string) (*model.User, error)
	Login(email, password string) (string, error)
}

type service struct {
	repo AuthRepository
	cfg  *bootstrap.Config
}

func NewServiceAuth(repo AuthRepository, cfg *bootstrap.Config) Service {
	return &service{repo, cfg}
}

func (s *service) Register(name, email, password, nip, address string) (*model.User, error) {
	hashed, err := security.HashPassword(password)
	if err != nil {
		return nil, err
	}

	user := &model.User{
		Name:     name,
		Email:    email,
		Password: hashed,
		Nip:      nip,
		Address:  address,
		RoleRef:  2, // Hardcoded to User roles
	}

	err = s.repo.Create(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *service) Login(email, password string) (string, error) {
	user, err := s.repo.FindByEmail(email)
	if err != nil {
		return "", errors.New("invalid email or password")
	}

	if !security.CheckPasswordHash(password, user.Password) {
		return "", errors.New("invalid email or password")
	}

	token, err := jwt.GenerateToken(user.IDUser, user.Email, s.cfg.JWTSecret)
	if err != nil {
		return "", err
	}

	// Update remember token with the JWT token
	err = s.repo.UpdateRememberToken(user.IDUser, token)
	if err != nil {
		return "", err
	}

	return token, nil
}
