const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define(
	'users',
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUIDV4,
			defaultValue: uuidv4(),
		},
		Name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Password: {
			type: DataTypes.STRING,
			allowNull: false,
			require: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			require: true,
		},
		role: {
			type: Sequelize.STRING,
			allowNull: false,
			require: true,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Phone_number: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		gender: {
			type: DataTypes.ENUM,
			values: ['male', 'female'],
			defaultValue: 'male',
		},
	},
	{
		timestamps: true,
		createdAt: true,
		updatedAt: true,
		sequelize,
	}
);
User.beforeCreate(async (user, options) => {
	const hash = await bcrypt.hash(user.Password, 10);
	user.Password = hash;
});
User.prototype.isValidPassword = function (password) {
	return bcrypt.compareSync(password, this.Password);
};

module.exports = User;
