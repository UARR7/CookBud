// src/services/api.js
export const API_BASE_URL = "http://localhost:5001/api";

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) throw new Error("Failed to fetch posts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const createPost = async (postData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const likePost = async (postId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to like post");
    return await response.json();
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};

export const upvotePost = async (postId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/upvote`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to upvote post");
    return await response.json();
  } catch (error) {
    console.error("Error upvoting post:", error);
    throw error;
  }
};

export const addComment = async (postId, content, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) throw new Error("Failed to add comment");
    return await response.json();
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};
