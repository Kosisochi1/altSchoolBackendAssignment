const joi = require('joi');

const validateItem = async (req, res, next) => {
	try {
		const schema = joi.object({
			Name: joi.string().required(),
			Price: joi.string().required(),
			Size: joi.string().required(),
			Description: joi.string().required().max(30),
		});
		await schema.validateAsync(req.body, { abortEarly: true });
		next();
	} catch (error) {
		return res.status(422).json({
			massage: error.massage,
			success: false,
		});
	}
};

module.exports = { validateItem };
