import express from 'express';
import Task from '../models/Task.js';

export const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().toSorted({ createdAt: 'desc' })
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrive tasks' })
  }
});

router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({ title });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    } 
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task' });
  } 
});

export default router;
