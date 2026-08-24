const express = require('express');
const Trainer = require('../models/Trainer');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
