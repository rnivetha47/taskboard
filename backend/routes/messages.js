const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');

// Post message
router.post('/', auth, async (req, res) => {
  try {
    const { message } = req.body;
    const msg = new Message({ userId: req.user.id, userName: req.body.userName || 'Anonymous', message });
    await msg.save();
    res.json(msg);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get messages
router.get('/', async (req, res) => {
  try {
    const msgs = await Message.find().sort('timestamp').limit(200);
    res.json(msgs);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
