const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: { type: String },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Message', MessageSchema);
