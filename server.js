require('dotenv').config();

const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
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

const port = process.env.PORT;

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:127.0.0.1:5173/',
];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (origin === undefined || allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//   })
// );

const { PORT = 8000 } = process.env;

app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
