const express = require('express');
const router = express.Router();

const { getAllServers } = require('../functions/servers');

// fetch all servers

router.get('/api/servers', async (req, res) => {
  const allServers = req.body;
  try {
    const results = await getAllServers(allServers);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred to display all servers');
  }
});

module.exports = router;
