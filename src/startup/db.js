const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = async () => {
	const connectionString = config.get('db');
	await mongoose.connect(connectionString, {
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
