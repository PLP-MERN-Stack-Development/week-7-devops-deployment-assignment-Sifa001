import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, Suspense, lazy } from 'react';
import './App.css';

const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const NewPost = lazy(() => import('./pages/NewPost.jsx'));

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <header>
        My Blog Platform
      </header>
      <nav>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        {user && (
          <>
            | <Link to={`/profile/${user.username}`}>Profile</Link>
            | <Link to="/new-post">New Post</Link>
          </>
        )}
      </nav>
      <Suspense fallback={<div style={{textAlign:'center',margin:'2rem'}}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/new-post" element={<NewPost user={user} />} />
        </Routes>
      </Suspense>
      <footer>
        <p>&copy; {new Date().getFullYear()} My Blog Platform. Made with ❤️</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
