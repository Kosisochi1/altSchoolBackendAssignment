'use strict';

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
		await queryInterface.bulkInsert('Users', [
			{
				Name: 'Emma',
				Password: 'kosi',
				email: 'emma@gmail.com',
				role: 'admin',
				address: 'Kano',
				Phone_number: '123456789',
				gender: 'male',
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
		await queryInterface.bulkDelete('Users', null, {
			Name: 'Emma',
			Password: 'kosi',
			email: 'emma@gmail.com',
			role: 'admin',
			address: 'Kano',
			Phone_number: '123456789',
			gender: 'male',
		});
	},
};
