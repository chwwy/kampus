const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  cardId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  gender: {
    type: Number, // 1 for male, 2 for female
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
