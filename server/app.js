const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const usersRouter = require('./controllers/users');
const melodiesRouter = require('./controllers/melodies');
const loginRouter = require('./controllers/login');

mongoose.set('strictQuery', false);

logger.info('connecting to ', config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to mongodb');
  }).catch(err => {
    logger.error('connection with mongodb failed ', err.message);
  });


app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/melodies', melodiesRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;