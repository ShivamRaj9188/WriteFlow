import api from './api';

/** Fetch a page of posts (newest first) */
export const getPosts = (page = 0, size = 10) =>
  api.get('/posts', {
    params: { page, size, sortBy: 'createdAt', direction: 'desc' },
  });

/** Fetch a single post by numeric ID */
export const getPostFromApi = (id) => api.get(`/posts/${id}`);

/** Create a new post (requires auth) */
export const createPost = (title, content) =>
  api.post('/posts', { title, content });

/** Update an existing post (requires auth + owner) */
export const updatePost = (id, title, content) =>
  api.put(`/posts/${id}`, { title, content });

/** Delete a post (requires auth + owner) */
export const deletePost = (id) => api.delete(`/posts/${id}`);
