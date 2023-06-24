const express = require('express');
const router = express.Router();

const { getAllServers, addServer } = require('../functions/servers');

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

router.post('/api/server', async (req, res) => {
  const { name, type, status } = req.body;
  try {
    const results = await addServer(name, type, status);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred to add this server');
  }
});

module.exports = router;
