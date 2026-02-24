package supabase

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"path/filepath"
	"strings"
	"time"
)

func UploadAvatar(supabaseURL, supabaseKey, bucket string, file multipart.File, header *multipart.FileHeader) (string, error) {
	ext := strings.ToLower(filepath.Ext(header.Filename))
	objectPath := fmt.Sprintf("avatar/%d%s", time.Now().UnixNano(), ext)
	return uploadFile(supabaseURL, supabaseKey, bucket, objectPath, file, ext)
}

func UploadThumbnail(supabaseURL, supabaseKey, bucket string, file multipart.File, header *multipart.FileHeader) (string, error) {
	ext := strings.ToLower(filepath.Ext(header.Filename))
	objectPath := fmt.Sprintf("thumbnail/%d%s", time.Now().UnixNano(), ext)
	return uploadFile(supabaseURL, supabaseKey, bucket, objectPath, file, ext)
}

func uploadFile(supabaseURL, supabaseKey, bucket, objectPath string, file multipart.File, ext string) (string, error) {
	defer file.Close()

	fileBytes, err := io.ReadAll(file)
	if err != nil {
		return "", fmt.Errorf("supabase: failed to read file: %w", err)
	}

	uploadURL := fmt.Sprintf("%s/storage/v1/object/%s/%s", supabaseURL, bucket, objectPath)

	req, err := http.NewRequest(http.MethodPost, uploadURL, bytes.NewReader(fileBytes))
	if err != nil {
		return "", fmt.Errorf("supabase: failed to build request: %w", err)
	}
	req.Header.Set("Authorization", "Bearer "+supabaseKey)
	req.Header.Set("Content-Type", detectContentType(ext))
	req.Header.Set("x-upsert", "true")

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("supabase: upload request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		body, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("supabase: upload error %d: %s", resp.StatusCode, string(body))
	}

	return fmt.Sprintf("%s/storage/v1/object/public/%s/%s", supabaseURL, bucket, objectPath), nil
}

func detectContentType(ext string) string {
	switch ext {
	case ".jpg", ".jpeg":
		return "image/jpeg"
	case ".png":
		return "image/png"
	case ".gif":
		return "image/gif"
	case ".webp":
		return "image/webp"
	default:
		return "application/octet-stream"
	}
}
