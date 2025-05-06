const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const threadRoutes = require('./routes/threadRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/threads', threadRoutes);
app.use('/api/messages', messageRoutes)

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log("MongoDB connection Success");
})
.catch((err) => {
  console.log("MongoDB connection error", err)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))