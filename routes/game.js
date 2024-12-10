const express = require('express');
const router = express.Router();
const db = require("../db/queries");

// fetch three random targets before a game starts
router.get('/', async (req, res) => {
  try {
    const limit = 3;

    console.log(`Fetching ${limit} random targets...`)
    const targets = await db.getRandomTargets(limit);

    res.json(targets);
  } catch (error) {
    console.error('Error fetching random targets:', error);
    res.status(500).json({ error: 'Failed to fetch random targets' });
  }
});

router.get('/scores', async (req, res) => {
  try {
    console.log('Fetching high scores...');
    const scores = await db.getAllPlayers();

    scores.length >= 1 ? res.json(scores) : res.json({ message: 'No high scores available' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch high scores' });
  }
})

router.get('/guess', async (req, res) => {
  try {
    const { name, x, y } = req.query;
    console.log('Analyzing guess...');

    if (!name || !x || !y) {
      return res.status(400).json({ error: 'Missing required parameters: name, x, or y' });
    }

    const isCorrect = await db.isGuessCorrect(name, parseFloat(x), parseFloat(y));

    res.json({ isCorrect });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to parse guess' });
  }
});

module.exports = router;
