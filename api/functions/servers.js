const { executeQuery } = require('../../dbConnection');

// function to get all servers
async function getAllServers() {
  const results = await executeQuery('SELECT * FROM servers');
  return results;
}

// function to add a server
async function addServer(name, type, status) {
  console.log('function', name, type, status);
  const results = await executeQuery(
    'INSERT INTO servers (name, type, status) VALUES ($1, $2, $3)',
    [name, type, status]
  );
  return results;
}

module.exports = {
  addServer,
  getAllServers,
};
