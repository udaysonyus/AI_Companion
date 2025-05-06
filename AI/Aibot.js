const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Message = require("../models/messageModel");
require('dotenv').config();

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatwithAi = async (req, res) => {

  const {threadId, text} = req.body;

  try {
    const userMessage = new Message({threadId, sender : "user", text})
    await userMessage.save();

    const model = genAi.getGenerativeModel({model: 'gemini-1.5-flash'});
    const result = await model.generateContent(text); 
    const aiText = result.response.text(); 

    const aiMessage = new Message({threadId : userMessage.threadId, sender : "bot", text : aiText});
    await aiMessage.save();

    res.json({response: aiText});
  } catch (error) {
    console.error("Error processing the message", error);
    res.status(500).json({error: "Failed to process AI message"});
  }
};

module.exports = {chatwithAi};
