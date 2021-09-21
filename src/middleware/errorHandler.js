const winston = require('winston');

// module.exports = function (err, req, res, next) {
// 	winston.error(err.message, err);

// 	res.status(500).send('Server Error, Something Failed');
// };

const createError = require('http-errors');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	// eslint-disable-next-line no-console
	winston.error(err.message, err);

	// if the error is safe to expose to client
	if (err.expose === true) {
		res.status(err.status || 500).send(err);
	} else {
		res.status(500).send(createError.InternalServerError());
	}
};

module.exports = errorHandler;
