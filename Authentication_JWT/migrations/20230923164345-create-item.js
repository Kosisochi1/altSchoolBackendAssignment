const { v4: uuidv4 } = require('uuid');
('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Items', {
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
			Price: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			Size: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			Description: {
				type: Sequelize.STRING,
				allowNull: false,
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
		await queryInterface.dropTable('Items');
	},
};
