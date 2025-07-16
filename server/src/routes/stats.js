const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

// GET /api/stats
router.get('/', async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    const totalUsers = await User.countDocuments();

    // Find the most active author (user with most posts)
    const agg = await Post.aggregate([
      { $group: { _id: '$author', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    let mostActiveAuthor = null;
    if (agg.length > 0) {
      const user = await User.findById(agg[0]._id);
      mostActiveAuthor = user ? user.username : null;
    }

    res.json({ totalPosts, totalUsers, mostActiveAuthor });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
