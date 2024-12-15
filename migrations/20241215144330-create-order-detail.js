'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderDetails', {
      id_order: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: "orderforms",
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
      request: {
        type: Sequelize.STRING
      },
      surcharge: {
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
    await queryInterface.dropTable('OrderDetails');
  }
};