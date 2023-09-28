const User = require('../models/user');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
require('dotenv').config();

const app = express();

app.use(express.json());

// Create User
const createUser = async (req, res) => {
	const reqBody = req.body;
	const existingUser = await User.findOne({
		where: { email: reqBody.email },
	});
	// check if user exist already
	if (existingUser) {
		return res.status(409).json({
			massage: 'User already existed',
		});
	}

	const newUser = await User.create({
		id: shortid.generate(),
		Name: reqBody.Name,
		Password: reqBody.Password,
		email: reqBody.email,
		role: reqBody.role,
		address: reqBody.address,
		Phone_number: reqBody.Phone_number,
		gender: reqBody.gender,
	});
	// create token for the user
	const token = await jwt.sign(
		{ email: newUser.email, id: newUser.id },
		process.env.JWT_SECRETE
	);
	return res.status(201).json({
		massage: 'User created',
		newUser: newUser,
		token,
	});
};
// Create User Login
const UserLogin = async (req, res) => {
	const reqBody = req.body;
	// Check if user exist
	const newUser = await User.findOne({
		where: { email: reqBody.email },
	});
	if (!newUser) {
		return res.status(404).json({
			massage: 'User not found',
		});
	}
	// if user check , Validate Password
	const validatePassword = await newUser.isValidPassword(reqBody.Password);
	if (!validatePassword) {
		return res.status(422).json({
			massage: 'Email or Password not correct',
		});
	}
	// Create token for login session
	const token = await jwt.sign(
		{ email: newUser.email, id: newUser.id },
		process.env.JWT_SECRETE,
		{ expiresIn: '1h' }
	);
	return res.status(201).json({
		massage: 'Login Successfull',
		newUser,
		token,
	});
};
module.exports = {
	createUser,
	UserLogin,
};
