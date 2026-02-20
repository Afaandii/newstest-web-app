package bootstrap

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Conn(cfg *Config) (*gorm.DB, error){
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		cfg.DB_HOST, cfg.DB_PORT, cfg.DB_USER, cfg.DB_PASSWORD, cfg.DB_NAME,
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("Open connection error: %v", err)
	}
	return db, nil
}