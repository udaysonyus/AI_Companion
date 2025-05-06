const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  threadId: {type: mongoose.Schema.Types.ObjectId, required: true},
  sender: {type: String, required: true},
  text: {type: String, required: true},
  createdAt: {type : Date, default: Date.now}
})

const messages = mongoose.model('Messages', messageSchema);

module.exports = messages;