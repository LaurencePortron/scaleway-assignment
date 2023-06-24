const { executeQuery } = require('../../dbConnection');

// function to get all servers

async function getAllServers() {
  const results = await executeQuery('SELECT * FROM servers');
  return results;
}

async function addServer(name, type, status) {
  const results = await executeQuery(
    `INSERT INTO "servers" ("name", "type", "status") VALUES ($1, $2, $3)`,
    [name, type, status]
  );
  return results;
}

module.exports = {
  addServer,
  getAllServers,
};
