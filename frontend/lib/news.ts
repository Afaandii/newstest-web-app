export interface Category {
  id_category: number;
  name: string;
  slug: string;
}

export interface User {
  id_user: number;
  name: string;
  email: string;
  role_id: number;
}

export interface Post {
  id_post: number;
  user_id: number;
  category_id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  User: User;
  Category: Category;
}

export interface Comment {
  id_comment: number;
  user_id: number;
  post_id: number;
  content: string;
  parent_id: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
  status: string;
  is_liked?: boolean;
  User: User;
  replies?: Comment[]; // For frontend recursive display
}

export interface ApiResponse<T> {
  status: string;
  data: T;
}

const API_BASE_URL = "http://localhost:8080/v1";

export async function getComments(postId: number, userId?: number): Promise<Comment[]> {
  try {
    const url = new URL(`${API_BASE_URL}/posts/${postId}/comments`);
    if (userId) url.searchParams.append("user_id", userId.toString());

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.statusText}`);
    }
    const result: ApiResponse<Comment[]> = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
}

export async function createComment(postId: number, data: { user_id: number; content: string; parent_id?: number }): Promise<Comment | undefined> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to create comment: ${response.statusText}`);
    }
    const result: ApiResponse<Comment> = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error creating comment for post ${postId}:`, error);
    return undefined;
  }
}

export async function toggleLikeComment(commentId: number, userId: number): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/comments/${commentId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });
    if (!response.ok) {
      throw new Error(`Failed to toggle like: ${response.statusText}`);
    }
    const result = await response.json();
    return result.status; // "liked" or "unliked"
  } catch (error) {
    console.error(`Error toggling like for comment ${commentId}:`, error);
    return "";
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    const result: ApiResponse<Post[]> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getPostById(id: string): Promise<Post | undefined> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch post by ID: ${response.statusText}`);
    }
    const result: ApiResponse<Post> = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    return undefined;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/category`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    const result: ApiResponse<Category[]> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
