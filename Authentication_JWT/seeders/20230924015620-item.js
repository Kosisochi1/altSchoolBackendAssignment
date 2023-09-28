'use strict';

const { UUID, UUIDV4 } = require('sequelize');
const Items = require('../models/item');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert('items', [
			{
				Name: 'Carbonated Drink',
				Price: '250',
				Size: 'small',
				Description: 'Beaverages',
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('Items', null, {
			Name: 'Carbonated Drink',
			Price: '250',
			Size: 'small',
			Description: 'Beaverages',
		});
	},
};
