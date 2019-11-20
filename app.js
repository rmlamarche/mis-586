const express = require('express');
const app = express();
const logger = require('./server/logger.js');
const session = require('express-session');

const PORT = process.env.PORT || 5860;

app.listen(PORT, () => {
  logger.info(`mis-586 running on ${PORT}`);
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'abc213',
  cookie: {},
  saveUninitialized: true,
  resave: true
}));

app.use(require('./routes'));

app.use((err, req, res, next) => {
  logger.err(err);
  return res.status(err.status).send(err);
});