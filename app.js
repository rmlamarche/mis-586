const path = require('path');
const express = require('express');
const app = express();
const logger = require('./server/logger.js');
const session = require('express-session');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5860;
const DOCUMENT_ROOT = process.env.DOCUMENT_ROOT || '';

app.listen(PORT, () => {
  logger.info(`mis-586 running on ${PORT}`);
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'abc213',
  cookie: {},
  saveUninitialized: true,
  resave: true
}));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use((req,res,next) => {
  res.locals.documentRoot = DOCUMENT_ROOT;
  req.session.cart = req.session.cart || [];
  res.locals.numItems = req.session.cart.reduce((a,i) => a + i.qty,0);
  res.locals.cart = req.session.cart;
  req.session.achievementsEnabled = true;
  return next();
});

app.use(require('./routes'));