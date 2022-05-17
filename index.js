const express = require('express');
const gmembers = require('../models/gmembers');

const router = express.Router();

// GET / 라우터
router.get('/', async (req, res, next) => {
  try {
    const gmember = await gmembers.findAll();
    res.render('upload', { gmember });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;