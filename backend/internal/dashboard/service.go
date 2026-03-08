package dashboard

const (
	RecentPostsLimit = 5
)

type DashboardStats struct {
	TotalUsers    int64                    `json:"total_users"`
	TotalPosts    int64                    `json:"total_posts"`
	RecentPosts   []map[string]interface{} `json:"recent_posts"`
	TopCategories []map[string]interface{} `json:"top_categories"`
}

type Service interface {
	GetStats() (DashboardStats, error)
}

type service struct {
	repo DashboardRepository
}

func NewDashboardService(repo DashboardRepository) Service {
	return &service{repo}
}

func (s *service) GetStats() (DashboardStats, error) {
	userCount, err := s.repo.CountUsers()
	if err != nil {
		return DashboardStats{}, err
	}

	postCount, err := s.repo.CountPosts()
	if err != nil {
		return DashboardStats{}, err
	}

	recentPosts, err := s.repo.GetRecentPosts(RecentPostsLimit)
	if err != nil {
		return DashboardStats{}, err
	}
	if recentPosts == nil {
		recentPosts = []map[string]interface{}{}
	}

	topCategories, err := s.repo.GetTopCategories()
	if err != nil {
		return DashboardStats{}, err
	}
	if topCategories == nil {
		topCategories = []map[string]interface{}{}
	}

	return DashboardStats{
		TotalUsers:    userCount,
		TotalPosts:    postCount,
		RecentPosts:   recentPosts,
		TopCategories: topCategories,
	}, nil
}
