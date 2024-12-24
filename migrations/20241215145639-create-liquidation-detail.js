'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LiquidationDetails', {
      id_liq: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: "liquidationforms",
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
        type: Sequelize.SMALLINT
      },
      price_down: {
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
    await queryInterface.dropTable('LiquidationDetails');
  }
};