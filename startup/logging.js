const winston = require('winston');
require('express-async-errors');

module.exports = function () {
	winston.ExceptionHandler(
		new winston.transports.Console({ colorize: true, prettyPrint: true }),
		new winston.transports.File({ filename: 'uncaughtExeptions.log' })
	);

	process.on('unhandledRejection', ex => {
		throw ex;
	});

	winston.add(winston.transports.File, { filename: 'logfile.log' });
};
