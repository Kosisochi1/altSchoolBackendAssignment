'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const { v4: uuidv4 } = require('uuid');

const Items = sequelize.define(
	'items',
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: uuidv4(),
		},
		Name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Price: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Size: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		createdAt: true,
		updatedAt: true,
		sequelize,
	}
);
module.exports = Items;
