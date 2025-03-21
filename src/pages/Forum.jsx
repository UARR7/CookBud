
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, ArrowUp, Send, Plus, Loader } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import BackButton from '../components/ui/back-button';
import { useAuthStore } from '../stores/authStore';
import 'react-toastify/dist/ReactToastify.css';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const { user } = useAuthStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();


const handleSubmitPost = async (e) => {
    e.preventDefault();
  
    if (!title.trim() || !content.trim() || !tags.trim()) {
      toast.error("All fields are required ❌");
      return;
    }
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("You must be logged in to create a post ❌");
      return;
    }
  
    // Decode the token to get userId
    const decoded = jwtDecode(token);
    console.log("Decoded Token:", decoded); // Debugging
  
    const formattedPost = {
      title,
      content,
      tags: tags.split(",").map(tag => tag.trim()),
      userId: decoded.userId, // Ensure the backend gets this
    };
  
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:5001/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedPost),
      });
  
      const result = await response.json();
      console.log("Post Creation Response:", result); // Debugging
  
      if (response.ok) {
        toast.success("Post created successfully! ✨");
        setTitle("");
        setContent("");
        setTags("");
        setShowNewPostForm(false);
        fetchPosts();
      } else {
        toast.error(`Failed to create post ❌ ${result.message || ""}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };
  
const handleLikePost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Ensure authentication
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to like post");
      }
  
      const updatedPost = await response.json();
  
      // Update state so UI refreshes
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  

  const handleUpvotePost = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to upvote posts");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/posts/${postId}/upvote`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const updatedPost = await response.json();
        setPosts(posts.map(post => 
          post._id === postId ? updatedPost : post
        ));
      } else {
        toast.error("Failed to upvote post");
      }
    } catch (error) {
      console.error('Error upvoting post:', error);
      toast.error("Something went wrong");
    }
  };


  const handleAddComment = async (postId, content) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to comment");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });
      
      if (response.ok) {
        const newComment = await response.json();
        setPosts(posts.map(post => {
          if (post._id === postId) {
            return {
              ...post,
              comments: [...post.comments, newComment],
            };
          }
          return post;
        }));
      } else {
        toast.error("Failed to add comment");
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error("Something went wrong");
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        toast.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error("Failed to load posts");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 px-4 relative"
    >
      <ToastContainer position="top-right" theme="dark" />
      <BackButton />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Community Forum</h1>
            <p className="text-lg text-white/70">
              Share recipes and cooking tips with fellow food enthusiasts
            </p>
          </div>
          <button
            onClick={() => setShowNewPostForm(!showNewPostForm)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </div>

        {showNewPostForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 mb-8"
          >
            <form onSubmit={handleSubmitPost}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter post title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    Content
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    placeholder="Share your recipe or cooking tip"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter tags separated by commas"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowNewPostForm(false)}
                    className="px-4 py-2 text-white/70 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    {loading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    Post
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {loading && !posts.length ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-blue-400" />
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <span>{post.author.name}</span>
                      <span>•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <button
                      onClick={() => handleLikePost(post._id)}
                      className={`p-2 rounded-lg transition-colors ${
                        post.likes.includes(user?.userId)
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-white/5 text-white/50 hover:text-red-400'
                      }`}
                    >
                      <Heart className="w-5 h-5" />
                    </button> */}
                    <button
                        onClick={() => handleLikePost(post._id)}
                        className={`p-2 rounded-lg transition-colors ${
                            post.likes.includes(user?.userId)
                            ? "bg-red-500/20 text-red-400" // Liked state
                            : "bg-white/5 text-white/50 hover:text-red-400" // Default state
                        }`}
                        >
                        <Heart className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => handleUpvotePost(post._id)}
                      className={`p-2 rounded-lg transition-colors ${
                        post.upvotes.includes(user?.userId)
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-white/5 text-white/50 hover:text-green-400'
                      }`}
                    >
                      <ArrowUp className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-white/90 mb-4">{post.content}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/70"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white/70">
                    <MessageSquare className="w-5 h-5" />
                    <span>{post.comments.length} Comments</span>
                  </div>

                  {post.comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="bg-white/5 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70">{comment.author.name}</span>
                        <span className="text-sm text-white/50">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-white/90">{comment.content}</p>
                    </div>
                  ))}

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const content = e.target.comment.value;
                      if (content.trim()) {
                        handleAddComment(post._id, content);
                        e.target.comment.value = '';
                      }
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      name="comment"
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add a comment..."
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Forum;
