// Import the User model
const User = require('../models/user');
const { secretKey } = require('../config'); // Import your secret key from config
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 


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
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

    // Send token in response
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
// const authenticateUser = (req, res, next) => {
//   // Get the token from the request headers, query parameters, or cookies
//   const token = req.headers.authorization || req.query.token || req.cookies.token;

//   // Check if token is present
//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, secretKey);

//     // Attach the user ID to the request object for further use
//     req.userId = decoded.id;

//     // Call the next middleware or route handler
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
// };
const profile = async (req, res) => {
  
  try {
    // Get the authenticated user's ID from the request object
    const userId = req.userId;

    // Fetch the user profile data from the database using the user ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user profile data as a response
    res.status(200).json( {user} );
  } catch (err) {
    // Handle error if any
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export the controller functions
module.exports = {
  registerUser,
  loginUser,
  // authenticateUser,
  profile,
  
};