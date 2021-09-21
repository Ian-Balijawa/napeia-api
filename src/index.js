const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const createError = require('http-errors');

const app = express();

const errorHandler = require('./middleware/errorHandler');
// startup configurtions
require('./startup/db')();
require('./startup/logging')();
require('./startup/cors')(app);
require('./startup/routes')(app);
require('./startup/validation')();
require('./startup/config')();

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

// pass any unhandled errors to the error handler
app.use(errorHandler);

module.exports = app;
