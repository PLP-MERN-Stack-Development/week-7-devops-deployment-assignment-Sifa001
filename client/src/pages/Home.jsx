import { useEffect, useState } from 'react';
import API from '../api/api';

export default function Home({ user }) {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    API.get('/posts')
      .then(res => {
        setPosts(res.data);
        if (res.data.length > 0) {
          const sorted = [...res.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setFeatured(sorted[0]);
        }
      })
      .catch(err => console.error(err));
    API.get('/stats')
      .then(res => setStats(res.data))
      .catch(() => setStats(null));
  }, []);

  const handleEdit = (post) => {
    setEditingPost(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleEditSubmit = async (e, postId) => {
    e.preventDefault();
    try {
      await API.put(`/posts/${postId}`, { title: editTitle, content: editContent });
      setPosts(posts.map(p => p._id === postId ? { ...p, title: editTitle, content: editContent } : p));
      setEditingPost(null);
    } catch (err) {
      alert('Error updating post');
    }
  };

  const handleDelete = async (post) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await API.delete(`/posts/${post._id}`);
        setPosts(posts.filter(p => p._id !== post._id));
      } catch (err) {
        alert('Error deleting post');
      }
    }
  };

  return (
    <div>
      <div className="hero">
        <h2>Welcome to My Blog Platform!</h2>
        <p>Share your thoughts and read posts from others.</p>
      </div>
      {stats && (
        <div className="stats-bar">
          <div>
            <span className="stats-number">{Math.max(1, stats.totalPosts)}</span>
            <span className="stats-label">Posts</span>
          </div>
          <div>
            <span className="stats-number">{stats.totalUsers}</span>
            <span className="stats-label">Users</span>
          </div>
          <div>
            <span className="stats-number">{stats.mostActiveAuthor || 'N/A'}</span>
            <span className="stats-label">Top Author</span>
          </div>
        </div>
      )}
      {featured && (
        <div className="featured-post">
          <h2>Featured Post</h2>
          <div className="post-card featured">
            <div className="post-avatar">{featured.author?.username ? featured.author.username[0].toUpperCase() : "?"}</div>
            <div>
              <h4>{featured.title}</h4>
              <p>{featured.content}</p>
              <small>By {featured.author?.username}</small>
            </div>
          </div>
        </div>
      )}
      <h1 className="blog-title">Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts
          .filter(post => !featured || post._id !== featured._id)
          .map(post => (
            <PostCard
              key={post._id}
              post={post}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
              editingPost={editingPost}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editContent={editContent}
              setEditContent={setEditContent}
              onEditSubmit={handleEditSubmit}
            />
          ))
      )}
    </div>
  );
}

function PostCard({ post, user, onEdit, onDelete, editingPost, editTitle, setEditTitle, editContent, setEditContent, onEditSubmit }) {
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const handleLike = async () => {
    try {
      const res = await API.post(`/posts/${post._id}/like`);
      setLikeCount(res.data.likes);
    } catch (err) {
      alert('Error liking post');
    }
  };

  const isAuthor = user && (post.author?._id === user._id);

  return (
    <div className="post-card">
      <div className="post-avatar">{post.author?.username ? post.author.username[0].toUpperCase() : "?"}</div>
      <div className="post-card-content" style={{ flex: 1, textAlign: 'left' }}>
        {editingPost === post._id ? (
          <form onSubmit={e => onEditSubmit(e, post._id)}>
            <input
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              required
              style={{ marginBottom: '0.5rem', width: '100%' }}
            />
            <textarea
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              required
              style={{ marginBottom: '0.5rem', width: '100%' }}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => onEdit(null)}>Cancel</button>
          </form>
        ) : (
          <>
            <h4 className="post-card-title" style={{ textAlign: 'left' }}>{post.title}</h4>
            <p className="post-card-body" style={{ textAlign: 'left' }}>{post.content}</p>
            <small>By {post.author?.username}</small>
          </>
        )}
        {isAuthor && editingPost !== post._id && (
          <div className="post-actions">
            <button className="edit-btn" onClick={() => onEdit(post)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(post)}>Delete</button>
          </div>
        )}
      </div>
      <div className="post-card-likes" style={{ display: 'flex', alignItems: 'center', alignSelf: 'stretch', marginLeft: '1rem' }}>
        <button className="like-btn" onClick={handleLike} style={{ margin: 0 }}>
          👍 {likeCount}
        </button>
      </div>
    </div>
  );
}