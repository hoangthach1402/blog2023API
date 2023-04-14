// Import the User model
const User = require('../models/user');
const { secretKey } = require('../config'); // Import your secret key from config
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const Post = require('../models/Post')

// Controller function to handle user registration
const registerUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password, dateOfBirth } = req.body;

    // Check if user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Use bcrypt to hash the password with a salt of 10 rounds

    // Create a new User object with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store the hashed password in the database
      dateOfBirth,
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    // Handle error if any
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to handle user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password
    const isPasswordMatch = await user.comparePassword(password);

    // If password doesn't match
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '5h' });

    // Send token in response
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const profile = async (req, res) => {

  res.send(req.userId)

 


  
};
const getUserById = async (req, res) => {
  const userId = req.params.userId; // Get user ID from URL parameter

  try {
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Count user's posts
    const postCount = await Post.countDocuments({ author: userId });

    // Return user object with post count
    return res.json({ user, postCount });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const showAllPostsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; // Lấy userId từ request parameters

    // Tìm kiếm các bài viết của người dùng dựa trên userId
    const posts = await Post.find({ author: userId });

    // Xử lý kết quả trả về (danh sách các bài viết)
    console.log('Các bài viết của người dùng với userId: ' + userId);
    console.log(posts);

    // Trả về kết quả dưới dạng JSON
    res.json(posts);
  } catch (error) {
    // Xử lý lỗi
    console.error('Lỗi khi tìm kiếm bài viết: ' + error.message);
    // Trả về thông báo lỗi cho client
    res.status(500).json({ error: error.message });
  }
};
// Export the controller functions
module.exports = {
  registerUser,
  loginUser,
  showAllPostsByUserId,
  profile,
  getUserById,
};