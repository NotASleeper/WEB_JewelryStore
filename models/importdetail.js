'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImportDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ImportForm, Product }) {
      // define association here
      this.belongsTo(ImportForm, { foreignKey: "id_lot" });
      this.belongsTo(Product, { foreignKey: "id_product" });
    }
  }
  ImportDetail.init({
    quantity: DataTypes.TINYINT,
    price: DataTypes.BIGINT,
    total: DataTypes.BIGINT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ImportDetail',
  });
  return ImportDetail;
};