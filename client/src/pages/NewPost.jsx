import { useState } from 'react';
import API from '../api/api';

export default function NewPost({ user }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/posts', { title, content, author: user?._id });
      setMessage('Post created!');
      setTitle('');
      setContent('');
    } catch (err) {
      setMessage('Error creating post.');
    }
  };

  return (
    <div className="container">
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Content"
          required
          rows={6}
          style={{ resize: 'vertical', fontSize: '1rem', padding: '0.7rem', borderRadius: '8px', border: '1px solid #232946', background: '#232946', color: '#f5f6fa', marginBottom: '1rem' }}
        />
        <button type="submit">Add Post</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
} 