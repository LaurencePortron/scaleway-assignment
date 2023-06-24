const { executeQuery } = require('../../dbConnection');

// function to get all servers

async function getAllServers() {
  const results = await executeQuery('SELECT * FROM servers');
  return results;
}

module.exports = {
  getAllServers,
};
