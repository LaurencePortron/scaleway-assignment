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

const port = process.env.PORT;

// Apply middlewares
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// for testing purposes only
app.get('/api/v1', (req, res) => {
  res.json({
    project: 'React and Express Boilerplate',
    from: 'Vanaldito',
  });
});

app.set('trust proxy', 1);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:8000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (origin === undefined || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(serversRouter);

const { PORT = 5000 } = process.env;

app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
