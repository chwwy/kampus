const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: Date,
  tickCount: Number,
  distance: Number,
  calories: Number
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
