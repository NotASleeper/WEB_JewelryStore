'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Gemstones', {
      id: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: "products",
          key: "id",
        },
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.SMALLINT
      },
      weight: {
        type: Sequelize.FLOAT
      },
      color: {
        type: Sequelize.STRING
      },
      purity: {
        type: Sequelize.FLOAT
      },
      certificate: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Gemstones');
  }
};