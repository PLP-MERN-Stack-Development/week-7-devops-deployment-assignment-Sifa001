const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

const router = express.Router();

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Add a comment to a post
router.post('/:postId', auth, async (req, res) => {
  try {
    const comment = new Comment({
      post: req.params.postId,
      author: req.user.userId,
      content: req.body.content,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get comments for a post
router.get('/:postId', async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate('author', 'username')
    .sort({ createdAt: -1 });
  res.json(comments);
});

// Delete a comment
router.delete('/:id', auth, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ error: 'Not found' });
  if (comment.author.toString() !== req.user.userId) return res.status(403).json({ error: 'Forbidden' });
  await comment.deleteOne();
  res.json({ message: 'Comment deleted' });
});

module.exports = router;
