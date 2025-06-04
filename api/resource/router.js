const express = require('express');
const Resource = require('./model');

const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    const resources = await Resource.getAll();
    res.json(resources);
  } catch (err) {
    next(err);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const { resource_name, resource_description } = req.body;
    if (!resource_name) {
      return res.status(400).json({ message: 'Resource name is required' });
    }
    const newResource = await Resource.add({ resource_name, resource_description });
    res.status(201).json(newResource);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
