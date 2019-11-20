const express = require('express');
const app = express();
const logger = require('./server/logger.js');

const PORT = process.env.PORT || 5860;

app.listen(PORT, () => {
  logger.info(`mis-586 running on ${PORT}`);
});

app.use(require('./routes'));

app.use((err, req, res, next) => {
  logger.err(err);
  return res.status(err.status).send(err);
});