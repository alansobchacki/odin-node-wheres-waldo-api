const express = require('express');
const router = express.Router();
const db = require("../db/queries");

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const limit = 3;
    const targets = await db.getRandomTargets(limit);
    
    res.json(targets);
  } catch (error) {
    console.error('Error fetching random targets:', error);
    res.status(500).json({ error: 'Failed to fetch random targets' });
  }
});

module.exports = router;
