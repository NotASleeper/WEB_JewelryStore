'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ImportForms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_supplier: {
        references: {
          model: "suppliers",
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
      id_employee: {
        references: {
          model: "employees",
          references: "id",
        },
        type: Sequelize.INTEGER
      },
      id_employee_accepted: {
        references: {
          model: "employees",
          references: "id",
        },
        type: Sequelize.INTEGER
      },
      total_price: {
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
    await queryInterface.dropTable('ImportForms');
  }
};