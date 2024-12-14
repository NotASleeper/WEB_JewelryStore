'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_category: {
        references: {
          model: "productcategories",
          key: "id"
        },
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      gold_age: {
        type: Sequelize.FLOAT
      },
      size: {
        type: Sequelize.SMALLINT
      },
      weight: {
        type: Sequelize.FLOAT
      },
      price: {
        type: Sequelize.BIGINT
      },
      warranty_period: {
        type: Sequelize.TINYINT
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
    await queryInterface.dropTable('Products');
  }
};