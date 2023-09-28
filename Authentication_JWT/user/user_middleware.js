const joi = require('joi');

const validateUser = async (req, res, next) => {
	try {
		const schema = joi.object({
			Name: joi.string().required(),
			Password: joi.string().required(),
			email: joi.string().required(),
			role: joi.string().required(),
			address: joi.string().required(),
			Phone_number: joi.string().required(),
			gender: joi.string().required(),
		});
		await schema.validateAsync(req.body, { abortEarly: true });
		next();
	} catch (error) {
		return res.status(422).json({
			masssage: error.masssage,
			success: false,
		});
	}
};

const LoginValidator = async (req, res, next) => {
	try {
		const schema = joi.object({
			Password: joi.string().required(),
			email: joi.string().required(),
		});

		await schema.validateAsync(req.body, { abortEarly: true });
		next();
	} catch (error) {
		return res.status(422).json({
			masssage: error.masssage,
			success: false,
		});
	}
};

module.exports = {
	validateUser,
	LoginValidator,
};
