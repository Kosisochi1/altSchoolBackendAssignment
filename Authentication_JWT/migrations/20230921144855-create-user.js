const { v4: uuidv4 } = require('uuid');
('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUIDV4,
				defaultValue: uuidv4(),
			},
			Name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			Password: {
				type: Sequelize.STRING,
				allowNull: false,
				require: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				require: true,
			},
			role: {
				type: Sequelize.STRING,
				allowNull: false,
				require: true,
			},
			address: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			Phone_number: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			gender: {
				type: Sequelize.ENUM,
				values: ['male', 'female'],
				defaultValue: 'male',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Users');
	},
};
