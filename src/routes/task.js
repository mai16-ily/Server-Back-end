import express from 'express';
import Task from '../models/Task.js';

export const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Mejor ordenar en la consulta en lugar de usar métodos de array
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tasks' });
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
