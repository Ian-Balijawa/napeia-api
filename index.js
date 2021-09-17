const express = require('express');
const config = require('config');
const winston = require('winston');
const app = express();

// startup configurations
require('./startup/logging');
require('./startup/cors');
require('./startup/db');
require('./startup/validation');
require('./startup/routes');
require('./startup/validation');

const PORT = process.env.PORT || config.get('port');
const server = app.listen(PORT, function () {
	winston.info(`Server up and running on port: ${PORT}...`);
});
module.exports = server;
