require('dotenv').config();

const Pool = require('pg').Pool;

const connection = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.error('connection unsuccessul' + err.stack);
    return;
  }
});

async function executeQuery(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  connection,
  executeQuery,
};
