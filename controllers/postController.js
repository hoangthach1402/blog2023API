const Post = require('../models/Post');
// const User = require('../models/user');
// POST: Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, category, tags, author } = req.body;
    const newPost = new Post({
      title,
      content,
      category,
      tags,
      author,
    });
    const savedPost = await newPost.save();
    res.status(201).json({ post: savedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET: Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdDate: 'desc' });
    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET: Get a specific post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(postId).populate({
      path: 'comments',
      populate: { path: 'replies' }
    });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // res.status(200).json({ comments: post.comments });
    res.json({ post },{ comments: post.comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT: Update a post by ID
const updatePost = async (req, res) => {
  try {
    const { title, content, category, tags, author } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, category, tags, author },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ post: updatedPost });
  } catch (err) {z
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE: Delete a post by ID
const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ post: deletedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  
  
};