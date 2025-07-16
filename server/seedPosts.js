const mongoose = require('mongoose');
const Post = require('./src/models/Post');
const User = require('./src/models/User');

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/blogdb'); 
  const user = await User.findOne(); // Use an existing user
  if (!user) {
    console.log('No user found. Please register a user first.');
    process.exit(1);
  }
  const posts = [
    { title: 'Welcome to the Blog!', content: 'This is the first post.', author: user._id },
    { title: 'Coffee and Code', content: 'Join us for a coding session with coffee!', author: user._id },
    { title: 'Deployment Tips', content: 'How to deploy your MERN app easily.', author: user._id }
  ];
  await Post.insertMany(posts);
  console.log('Seeded 3 posts!');
  process.exit();
}

seed(); 