import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/users/${username}`)
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>User not found.</div>;

  return (
    <div className="container">
      <h2>{profile.username}'s Profile</h2>
      <h3>Posts</h3>
      {profile.posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        profile.posts.map(post => (
          <div key={post._id} className="post-card">
            <div className="post-avatar">{profile.username[0].toUpperCase()}</div>
            <div>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
} 