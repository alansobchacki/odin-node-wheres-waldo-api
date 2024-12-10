const express = require('express');
const router = express.Router();
const db = require("../db/queries");

// GET three random targets before a game starts
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


// GET all high scores
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

// POST a player's current guess
router.post('/guess', async (req, res) => {
  try {
    const { name, x, y } = req.body;
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

// POST a player score
router.post('/save', async (req, res) => {
  try {
    const { name, score } = req.body;
    console.log('Saving player score...');

    if (!name || name.length < 1 || name.length > 6) {
      return res.status(400).json({ error: `Name must be between 1 and 6 characters long - ${name}` });
    }

    const newPlayer = await db.createPlayer(name, score);

    res.status(201).json(newPlayer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to save player scores' });
  }
});

module.exports = router;
