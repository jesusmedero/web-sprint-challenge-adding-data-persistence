const express = require('express');
const Project = require('./model');

const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.getAll();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const { project_name, project_description, project_completed } = req.body;
    if (!project_name) {
      return res.status(400).json({ message: 'Project name is required' });
    }
    const newProject = await Project.add({
      project_name,
      project_description,
      project_completed,
    });
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
