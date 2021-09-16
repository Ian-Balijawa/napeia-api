const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
	const connectionString = config.get('db');
	mongoose.connect(connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	});
	const db = mongoose.connection;
	db.on('error', () => winston.error('Database connection Error!'));
	db.once('open', () =>
		winston.info(
			`Successfully connected to database at: ${connectionString}`
		)
	);
};
