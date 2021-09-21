const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true,
	},
	password: {
		type: String,
		minlength: 6,
		maxlength: 255,
		required: true,
	},
	isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			name: this.name,
			email: this.email,
			isAdmin: this.isAdmin,
		},
		config.get('jwtPrivateKey')
	);
	return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(255).required(),
		email: Joi.string().min(5).max(255).email().required(),
		password: Joi.string().min(6).max(255).required(),
	});

	return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
