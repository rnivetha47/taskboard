const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// Create task
router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({ userId: req.user.id, title: req.body.title });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort('-createdAt');
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update task
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    if (task.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    task.title = req.body.title ?? task.title;
    if (typeof req.body.isCompleted === 'boolean') task.isCompleted = req.body.isCompleted;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    if (task.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    await task.deleteOne();
    res.json({ msg: 'Task removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
