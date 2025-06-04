const express = require('express');
const Task = require('./model');

const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const { task_description, task_notes, task_completed = false, project_id } = req.body;
    if (!task_description || !project_id) {
      return res.status(400).json({ message: 'task_description and project_id are required' });
    }
    const newTask = await Task.add({
      task_description,
      task_notes: task_notes || null,
      task_completed: task_completed ? 1 : 0,
      project_id,
    });
    // Convertir task_completed a boolean al devolver
    newTask.task_completed = Boolean(newTask.task_completed);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

