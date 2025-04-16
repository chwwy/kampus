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
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
