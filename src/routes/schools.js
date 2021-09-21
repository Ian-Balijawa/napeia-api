const jwt = require('jsonwebtoken');
const config = require('config');
const validateObjectId = require('../middleware/validateObjectId');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const async = require('../middleware/async');
const admin = require('../middleware/admin');
const _ = require('lodash');
const { School, ValidateSchool: validate } = require('../models/school');
const express = require('express');
const router = express.Router();

// get all schools in the database. Done by an admin
router.get('/', auth, admin, async (req, res) => {
	const schools = await School.find();

	if (!schools)
		return res.status(404).send('No schools added in the database yet');

	res.send(schools);
});

//get a specific school from the db. All these operations must be done by an admin
router.get('/:id', validateObjectId, auth, admin, async (req, res) => {
	const school = await School.findById(req.params.id);

	if (!school)
		return res
			.status(404)
			.send(`No school found with the given id: ${req.params.id}`);

	res.send(school);
});

//Registering a school in the db. Done by a school. Later on a school will need to be verified.
//just like verifying an email.
router.post('/', async, async (req, res) => {
	const { error } = validate(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	const { registrationNumber } = req.body;
	const school = await School.findOne({ registrationNumber });
	if (school)
		return res
			.sendStatus(400)
			.send(
				`A school with the registration number ${registrationNumber} already exists in the database`
			);

	school = new School(
		_.pick(req.body, [
			'institutionName',
			'registrationNumber',
			'email',
			'contactPerson',
			'designation',
			'telephoneContact',
			'memberShipCategory',
		])
	);

	const salt = await bcrypt.genSalt(10);
	school.password = bcrypt.hash(school.registrationNumber, salt);
	await school.save();

	const token = school.generateAuthToken();
	res.header('x-auth-token', token).send(
		_.pick(school, [
			'_id',
			'institutionName',
			'registrationNumber',
			'email',
			'contactPerson',
			'designation',
			'telephoneContact',
			'memberShipCategory',
		])
	);
});

module.exports = router;
