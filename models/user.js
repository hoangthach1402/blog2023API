const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    // required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Define the possible values for the role field
    default: 'user' // Set the default value for the role field
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

  userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  
  // Generate JWT token method
  userSchema.methods.generateJWT = function() {
    const token = jwt.sign({ id: this._id }, secretKey, { expiresIn: '1h' }); // Replace secretKey with your actual secret key
    return token;
  };

  
  const User = mongoose.model('User', userSchema);

module.exports = User;