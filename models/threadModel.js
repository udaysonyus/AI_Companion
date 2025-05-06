const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
  userId: {type: String, required: true, unique: true},
  title: {type: String, required: true},
  createdAt: {type: Date, default: Date.now}
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;