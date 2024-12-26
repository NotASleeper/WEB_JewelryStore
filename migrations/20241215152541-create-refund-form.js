'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RefundForms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_employee: {
        references: {
          model: "employees",
          key: "id",
        },
        type: Sequelize.INTEGER
      },
      id_customer: {
        references: {
          model: "customers",
          key: "id",
        },
        type: Sequelize.INTEGER
      },
      id_order: {
        references: {
          model: "orderforms",
          key: "id",
        },
        type: Sequelize.INTEGER
      },
      id_product: {
        references: {
          model: "products",
          key: "id",
        },
        type: Sequelize.INTEGER
      },
      date_created: {
        type: Sequelize.DATE
      },
      note: {
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
    await queryInterface.dropTable('RefundForms');
  }
};