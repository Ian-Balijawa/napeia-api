const mongoose = require('mongoose');
const Joi = require('joi');

const schooolSchema = new mongoose.Schema({
	institutionName: {
		type: String,
		trim: true,
		lowercase: true,
		required,
		maxlength: 255,
		minlength: 3,
	},
	memberShipCategory: {
		type: String,
		lowercase: true,
		trim: true,
		required,
		maxlength: 255,
		minlength: 3,
	},
	contactPerson: {
		type: String,
		required,
		lowercase: true,
		trim: true,
		minlength: 10,
		maxlength: 13,
	},
	registrationNumber: {
		type: String,
		required,
		trim: true,
		minlength: 5,
		maxlength: 255,
	},
	designation: {
		type: string,
		required,
		lowercase: true,
		trim: true,
		minlength: 5,
		maxlength: 255,
	},
	telephoneContact: {
		type: String,
		required,
		trim: true,
		maxlength: 10,
		minlength: 13,
	},
	email: {
		type: String,
		required,
		trim: true,
		minlength: 5,
		unique: true,
	},
	ownerShipType: {
		type: String,
		lowercase: true,
		minlength: 5,
		trim: true,
		maxlength: 255,
		validate: {
			validator: data => {
				return new Promise((resolve, reject) => {
					if (
						data.toLowerCase() === 'soleproprietorship' ||
						data.toLowerCase() === 'partnership' ||
						data.toLowerCase() === 'limitedcompany'
					)
						resolve(data);
					else reject(new Error('Unacceptable onwership paramater'));
				});
			},
		},
	},
	otherOwnershipType: {
		type: String,
		lowercase: true,
		minlength: 1,
		trim: true,
		maxlength: 255,
	},
	ownerName: {
		type: String,
		minlength: 5,
		lowercase: true,
		maxlength: 255,
		trim: true,
		required,
	},
	ownerPesonalContact: {
		type: String,
		maxlength: 13,
		minlength: 10,
		required,
		trim: true,
	},
	ownerNIN: {
		type: String,
		trim: true,
		required,
		// TODO: CHECK THE ACTUAL NUMBER OF CHARACTERS IN A NIN
		minlength: 15, // FOR THE START
		maxlength: 15,
	},
	licensed: {
		type: Boolean,
	},
	licenseNumber: {
		type: String,
		trim: true,
		maxlength: 255,
		minlength: 15,
		required: () => licensed,
	},
	registered: {
		type: Boolean,
	},
	regNumber: {
		type: String,
		maxlength: 255,
		minlength: 15,
		trim: true,
		required: () => registered,
	},
	schoolCategory: {
		type: String,
		trim: true,
		minlength: 3,
		required,
		lowercase: true,
		maxlength: 5,
		validate: {
			validator: data => {
				return new Promise((resolve, reject) => {
					if (
						data.toLowerCase() === 'mixed' ||
						data.toLowerCase() === 'boys' ||
						data.toLowerCase() === 'girls'
					)
						resolve(data);
					else
						reject(
							new Error(
								`Unacceptable school Category parameter ${data}`
							)
						);
				});
			},
		},
	},
	dayBoarding: {
		type: String,
		trim: true,
		minlength: 3,
		maxlength: 10,
		lowercase: true,
		required,
		validate: {
			validator: data => {
				return new Promise((resolve, reject) => {
					if (
						data.toLowerCase() === 'both' ||
						data.toLowerCase() === 'day' ||
						data.toLowerCase() === 'boarding'
					)
						resolve(data);
					else
						reject(
							new Error(
								`Unacceptable school Category parameter ${data}`
							)
						);
				});
			},
		},
	},
	village: {
		type: String,
		maxlength: 255,
		minlength: 3,
		lowercase: true,
		trim: true,
		required,
	},
	parish: {
		type: String,
		maxlength: 255,
		minlength: 3,
		lowercase: true,
		trim: true,
		required,
	},
	subCounty: {
		type: String,
		maxlength: 255,
		minlength: 3,
		lowercase: true,
		trim: true,
		required,
	},
	district: {
		type: String,
		maxlength: 255,
		minlength: 3,
		lowercase: true,
		trim: true,
		required,
	},
	contactAddress: {
		type: String,
		maxlength: 13,
		minlength: 10,
		trim: true,
		required,
	},
	emailAddress: {
		type: String,
		required,
		minlength: 5,
		maxlength: 255,
		trim: true,
	},
	website: {
		type: String,
		trim: true,
		minlength: 3,
		maxlength: 255,
	},
	enrollment: {
		type: Number,
		trim: true,
		minlength: 1,
		maxlength: 2048,
		required,
	},
	teachingStaffFemale: {
		type: Number,
		trim: true,
		minlength: 0,
		maxlength: 500,
		required,
	},
	teachingStaffMale: {
		type: Number,
		trim: true,
		minlength: 0,
		maxlength: 500,
		required,
	},
});

const School = mongoose.model('School', schooolSchema);

const validateSchool = school => {
	const schema = Joi.object({
		institutionName: Joi.string().required().min(3).max(255),
		memberShipCategory: Joi.string().required().min(3).max(255),
		contactPerson: Joi.string().required().min(3).max(255),
		registrationNumber: Joi.string().required().min(3).max(255),
		designation: Joi.string().required().min(3).max(255),
		telephoneContact: Joi.string().required().min(10).max(13),
		email: Joi.string().required().min(5).max(255).email(),
		ownerShipType: Joi.string().required(),
		otherOwnershipType: Joi.string().max(20).min(1),
		ownerName: Joi.string().required().max(5).max(255),
		ownerPersonalContact: Joi.string().required().min(10).max(13),
		ownerNIN: Joi.string().required().min(15).max(15),
		licensed: Joi.boolean(),
		licenseNumber: Joi.string().required().min(1).max(255),
		registered: Joi.boolean().required(),
		regNumber: Joi.string().required().min(1).max(255),
		schoolCategory: Joi.string().required().min(3).max(255),
		dayBoarding: Joi.string().required().min(),
		village: Joi.string().required().min(3).max(255),
		parish: Joi.string().required().min(3).max(255),
		subCounty: Joi.string().required().min(3).max(255),
		district: Joi.string().required().min(3).max(255),
		contactAddress: Joi.string().required().min(10).max(13),
		emailAddress: Joi.string().required().min(5).max(255).email(),
		website: Joi.string().required().min(2).max(255),
		enrollment: Joi.string().required().min(1).max(2048),
		teachingStaffFemale: Joi.string().required().min(0).max(500),
		teachingStaffMale: Joi.string().required().min(0).max(500),
	});
	return schema.validate(school);
};

exports.School = School;
exports.ValidateSchool = validateSchool;
