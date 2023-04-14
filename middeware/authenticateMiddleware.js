
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const config = require('../config');
const User = require('../models/user');

// Middleware function to verify JWT token
const authenticateToken = (req, res, next) => {
  // Get the token from request headers
    // Get the token from the request headers, query parameters, or cookies
  const token = req.headers.authorization || req.query.token || req.cookies.token;

  // Check if token is present
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log(secretKey)
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Attach the user ID to the request object for further use
    req.userId = decoded.id;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

// Middleware function to check if user has admin role
const isAdmin = async (req, res, next) => {
  try {
    // Get the user object from the request
    // const { userId } = req.user;

    // Fetch the user from the database
    const user = await User.findById(req.userId);

    // Check if user has admin role
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. User is not an admin.' });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export the middleware functions
module.exports = {
  authenticateToken,
  isAdmin
};