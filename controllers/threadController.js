
const { default: mongoose } = require('mongoose');
const Thread = require('../models/threadModel');

const createThread = async (req, res) => {

  try {

    const {title} = req.body;

    if (!title) {
      return res.status(400).json({message: "Title are required"});
    }

    const userId = new mongoose.Types.ObjectId().toHexString();
    const newThread = await Thread.create({userId, title});

    res.status(201).json({
      message:"New Thread Created Successfully",
      thread: newThread
    });

  }
  catch (error) {
    console.error('Error Creating Thread', error);
    res.status(500).json({message: "Internal server error."})
  }
};

const getThreads = async (req, res) => {

  try {
    const Threads = await Thread.find();

    if (!Threads.length) {
      return res.status(500).json({message:"No threads Present"});
    };

    res.status(201).json({
      message: "Successfully fetched all Threads",
      threads: Threads
    })
  }
  catch (error) {
    res.status(400).json({message: "Internal Server Error"});
  }

};

module.exports = {createThread, getThreads};