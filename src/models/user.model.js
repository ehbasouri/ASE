const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    min: 6,
    max: 512
  }
});

const User = mongoose.model('users', UsersSchema);

module.exports = User;
