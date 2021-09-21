const express = require('express');
const config = require('config');
const winston = require('winston');
const users = require('./routes/users');
const morgan = require('morgan');
const app = express();

// startup configurtions
require('./startup/logging');
require('./startup/cors');
require('./startup/db');
require('./startup/validation');
require('./startup/routes');
require('./startup/validation');
require('./startup/routes');

app.use(morgan('dev'));

const PORT = process.env.PORT || config.get('port');
const server = app.listen(PORT, function () {
	winston.info(`Server up and running on port: ${PORT}...`);
});

module.exports = server;
