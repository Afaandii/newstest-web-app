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

export interface ApiResponse<T> {
  status: string;
  data: T;
}

const API_BASE_URL = "http://localhost:8080/v1";

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
