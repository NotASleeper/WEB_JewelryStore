'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LiquidationForms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_employee_created: {
        references: {
          model: "employees",
          key: "id",
        },
        type: Sequelize.INTEGER
      },
      id_employee_accepted: {
        references: {
          model: "employees",
          key: "id",
        },
        type: Sequelize.INTEGER
      },
      date_created: {
        type: Sequelize.DATE
      },
      date_accepted: {
        type: Sequelize.DATE
      },
      total_price: {
        type: Sequelize.BIGINT
      },
      product_status: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('LiquidationForms');
  }
};