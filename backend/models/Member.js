const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  membershipType: {
    type: String,
    enum: ['basic', 'premium', 'platinum'],
    default: 'basic',
  },
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
