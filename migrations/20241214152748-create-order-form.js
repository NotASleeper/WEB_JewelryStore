'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderForms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_customer: {
        references: {
          model: "customers",
          key: "id",
        },
        type: Sequelize.INTEGER
      },
      id_employee: {
        references: {
          model: "employees",
          key: "id",
        },
        type: Sequelize.INTEGER
      },
      is_used_point: {
        type: Sequelize.BOOLEAN
      },
      id_coupon: {
        references: {
          model: "coupons",
          key: "id",
        },
        type: Sequelize.INTEGER
      },
      total_price: {
        type: Sequelize.BIGINT
      },
      date_created: {
        type: Sequelize.DATE
      },
      date_payment: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('OrderForms');
  }
};