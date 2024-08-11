const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['User', 'Super Admin','Content Admin','Theatre Admin','Community Admin'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdAt_EP: {
    type: Number,
    default: Math.floor(Date.now() / 1000),
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt_EP: {
    type: Number,
    default: Math.floor(Date.now() / 1000),
    index: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;