require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();

const serversRouter = require('./api/routes/servers');
const assetsRouter = require('./server/assets-router');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/src', assetsRouter);

app.set('trust proxy', 1);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(serversRouter);

const { PORT = 8000 } = process.env;

app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
