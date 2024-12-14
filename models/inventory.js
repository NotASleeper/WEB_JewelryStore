'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      // define association here
      this.belongsTo(Product, { foreignKey: "id" });
    }
  }
  Inventory.init({
    quantity: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};