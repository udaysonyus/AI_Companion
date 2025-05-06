const { default: mongoose } = require('mongoose');
const messages = require('../models/messageModel')

const addMessage = async (req, res) => {

  try {

    const {sender = "user", text} = req.body;

    if (!text) {
      return res.status(400).json({message: "Text informations are required"})
    };

    const threadId = new mongoose.Types.ObjectId().toHexString();
    const added_message = await messages.create({threadId, sender, text});

    res.status(201).json({
      message: "New Message Added",
      Added_Message : added_message
    })
  } catch(error) {
    console.error("Error Adding Message", error)
    res.status(500).json({message: "Internal Server Error"})
  }

}

const getMessages = async (req, res) => {

  try {
    const gotMessages = await messages.find();

    if (!gotMessages.length) {
      return res.status(200).json({message : "No messages found in the DataBase"});
    };

    res.status(201).json({
      message: "Messages Found",
      messages : gotMessages
    });

  } catch (error) {

    console.error("Error Finding the Messages", error);
    res.status(500).json({message: "Internal Server Error"});
  }

}

const getMessageByThreadId = async (req, res) => {

  const {searchId} = req.params;

  try {

    if (!searchId) {
      return res.status(400).json({message: " Thread id is required"})
    };

    const fo_messages = await messages.find();

    const messagesById = fo_messages.filter((mess) => mess.threadId.toString() === searchId)

    res.status(201).json({
      message: `found messages by threadID : ${searchId}`,
      foundMessages : messagesById
    })
  } catch (error) {

    console.error("Error Finding the Messages by Id", error);
    res.status(500).json({message: "Internal Server Error"});
  }
}

module.exports = {addMessage, getMessages, getMessageByThreadId}