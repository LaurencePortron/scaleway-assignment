import {
  TCreateServerResponse,
  TFetchServerResponse,
  TServer,
  TServersListResponse,
} from '../types';
const { executeQuery, connection } = require('../../dbConnection');

// function to get all servers
async function getAllServers(): Promise<TServersListResponse[]> {
  const results = await executeQuery('SELECT * FROM servers');
  return results;
}

// function to add a server
async function addServer(
  name: string,
  type: string,
  status: string
): Promise<TCreateServerResponse> {
  const query = {
    text: 'INSERT INTO servers(name, type, status) VALUES($1, $2, $3)',
    values: [name, type, status],
  };
  const results = await connection.query(query);

  return results;
}

// function to get one server
async function getServerById(id: number): Promise<TFetchServerResponse> {
  const results = await executeQuery('SELECT * FROM servers WHERE id = $1', [
    id,
  ]);
  return results[0] || null;
}

module.exports = {
  addServer,
  getServerById,
  getAllServers,
};
