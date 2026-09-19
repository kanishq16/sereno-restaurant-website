const express = require("express");
const router = express.Router();
const { readData, writeData } = require("../db");

// GET /api/contact - list messages (admin use)
router.get("/", (req, res) => {
  const messages = readData("messages");
  res.json(messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// POST /api/contact - send a message
router.post("/", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email and message are required." });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  const messages = readData("messages");
  const newMessage = {
    id: Date.now(),
    name,
    email,
    subject: subject || "General enquiry",
    message,
    createdAt: new Date().toISOString()
  };

  messages.push(newMessage);
  writeData("messages", messages);

  res.status(201).json({ message: "Message sent. We'll be in touch soon." });
});

module.exports = router;
