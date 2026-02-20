package main

import (
	"fmt"
	"log"
	"net/http"
	"newstest-app/internal/bootstrap"

	"github.com/gin-gonic/gin"
)

func main() {
	cfg := bootstrap.LoadConfig()
	db, err := bootstrap.Conn(cfg)
	if err != nil{
		log.Fatal("db connect:", err)
	}

	bootstrap.AutoMigrate(db)
	r := gin.Default()

	if cfg.PORT == "" {
		cfg.PORT = "8080"
	}

	fmt.Println("Server running on port", cfg.PORT)
	log.Fatal(http.ListenAndServe(":"+cfg.PORT, r))
}