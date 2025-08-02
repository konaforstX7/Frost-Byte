
import { useState, useEffect, useCallback } from 'react';
import type { BlogPost } from '../types';

// API endpoint for blog posts
const API_URL = 'http://localhost:8000/api/posts/';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Legacy storage key, no longer used
const STORAGE_KEY = 'cryoflux-blog-posts';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(API_URL, {
          headers: token ? { 'Authorization': `Token ${token}` } : {}
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // Convert Django's created_at to createdAt for consistency with frontend
        const formattedPosts = data.map((post: any) => ({
          ...post,
          createdAt: post.created_at,
        }));
        setPosts(formattedPosts);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch posts from API", error);
        setError(error instanceof Error ? error.message : 'Failed to fetch posts');
      } finally {
        setIsLoaded(true);
      }
    };

    fetchPosts();
  }, []);

  // Add a new post via API
  const addPost = useCallback(async (postData: { title: string; content: string }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('You must be logged in to add a post');
      }
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add post: ${response.status} ${response.statusText}`);
      }

      const newPost = await response.json();
      // Convert created_at to createdAt
      const formattedPost = {
        ...newPost,
        createdAt: newPost.created_at,
      };

      setPosts(prevPosts => [formattedPost, ...prevPosts]);
      setError(null);
    } catch (error) {
      console.error("Failed to add post via API", error);
      setError(error instanceof Error ? error.message : 'Failed to add post');
    }
  }, []);

  // Delete a post via API
  const deletePost = useCallback(async (id: string) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('You must be logged in to delete a post');
      }
      console.log(`Attempting to delete post with id: ${id}`);
      const response = await fetch(`${API_URL}${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      console.log(`Delete request status: ${response.status}`);

      // 204状态码表示成功但没有返回内容
      if (!response.ok && response.status !== 204) {
        if (response.status === 403) {
          throw new Error('Sorry, It\'s not created by your account.');
        } else {
          throw new Error(`Failed to delete post: ${response.status} ${response.statusText}`);
        }
      }

      setPosts(prevPosts => prevPosts.filter(p => p.id !== id));
      setError(null);
    } catch (error) {
      console.error("Failed to delete post via API", error);
      setError(error instanceof Error ? error.message : 'Failed to delete post');
    }
  }, []);

  return { posts, addPost, deletePost, isLoaded, error, setError };
};
