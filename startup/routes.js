const express = require('express');
const morgan = require('morgan');
const users = require('../routes/users');
const error = require('../middleware/error');

module.exports = app => {
	app.use(express.json());
	app.use('/api/users', users);
	app.use(error);
};
