const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpires: Date,
});

// Create the User model
const User = mongoose.model('Owner_reset', userSchema);

module.exports = User;
