require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const assetsRouter = require('./server/assets-router');

const Pool = require('pg').Pool;

const connection = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/src', assetsRouter);

app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const { PORT = 5000 } = process.env;

app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
