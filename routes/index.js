const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const easterEgg = 'hello world!'

    res.json(easterEgg);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
