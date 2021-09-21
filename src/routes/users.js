const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const async = require('../middleware/asyncHandler');
const bcrypt = require('bcrypt');
const admin = require('../middleware/admin');
const _ = require('lodash');
const { User, validateUser } = require('../models/user.js');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
	const user = await User.findById(req.user.id).select('-password');

	if (!user) return res.status(404).send('No user found with given id');

	res.send(user);
});

// signup route
router.post('/', async, async (req, res) => {
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const { email } = req.body;
	let user = await User.findOne({ email });
	if (user)
		return res
			.status(400)
			.send(`User with email ${req.body.email} already exists`);

	user = new User(_.pick(req.body, ['name', 'email', 'password']));
	const salt = await bcrypt.genSalt(10);
	user.password = bcrypt.hash(user.password, salt);
	await user.save();

	const token = user.generateAuthToken();
	res.header('x-auth-token', token).send(
		_.pick(user, ['_id', 'name', 'email'])
	);
});

module.exports = router;
