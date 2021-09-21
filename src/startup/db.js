const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = async () => {
  const connectionString = config.get('db');
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      winston.info(`Successfully connected to database at: ${connectionString}`)
    )
    .catch(() => winston.error('Database connection Error!'));
};
