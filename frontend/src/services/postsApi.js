import api from './api';

/** Parse a cover image marker from the start of stored content.
 *  Format stored in DB: "[cover:https://...]\\n\\n<rest of content>"
 *  Returns { coverImageUrl: string, cleanContent: string }
 */
export function parseCoverImage(rawContent = '') {
  const match = rawContent.match(/^\[cover:(https?:\/\/[^\]]+)\]\n\n?([\s\S]*)$/);
  if (match) {
    return { coverImageUrl: match[1].trim(), cleanContent: match[2] };
  }
  return { coverImageUrl: '', cleanContent: rawContent };
}

/** Normalize a backend post to the same shape ArticleCard + Post.jsx expect */
export function normalizeBackendPost(post) {
  const { coverImageUrl, cleanContent } = parseCoverImage(post.content || '');
  const words = cleanContent.trim() === '' ? 0 : cleanContent.trim().split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  const readTime = mins < 1 ? '1 min read' : `${mins} min read`;

  return {
    id: String(post.id),
    title: post.title,
    content: cleanContent,
    rawContent: post.content,
    coverImageUrl,
    image: coverImageUrl || null,
    excerpt: cleanContent.replace(/<[^>]*>/g, '').slice(0, 180) + (cleanContent.length > 180 ? '…' : ''),
    tag: 'Blog',
    category: 'General',
    authorName: post.author?.username || 'Unknown',
    authorAvatar: null,
    date: post.createdAt
      ? new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : '',
    readTime,
    likes: post.likeCount ?? 0,
    views: post.viewCount ?? 0,
    shares: post.shareCount ?? 0,
    isBackendPost: true,
    backendId: post.id,
  };
}

/** Fetch the current authenticated user's posts */
export const getMyPosts = (page = 0, size = 20) =>
  api.get(`/posts/my?page=${page}&size=${size}`);

/** Fetch a page of posts (newest first) */
export const getPosts = (page = 0, size = 20) =>
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
