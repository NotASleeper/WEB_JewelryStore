'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ImportDetails', {
      id_lot: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: "importforms",
          key: "id",
        },
        type: Sequelize.INTEGER
      },
      id_product: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: "products",
          key: "id",
        },
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.TINYINT
      },
      price: {
        type: Sequelize.BIGINT
      },
      total: {
        type: Sequelize.BIGINT
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
    await queryInterface.dropTable('ImportDetails');
  }
};