'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ProductCategory, Gemstone, Inventory, ImportDetail }) {
      // define association here
      this.belongsTo(ProductCategory, { foreignKey: "id_category" });
      this.hasOne(Gemstone, { foreignKey: "id" });
      this.hasOne(Inventory, { foreignKey: "id" });
      this.hasMany(ImportDetail, { foreignKey: "id_product" });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    gold_age: DataTypes.FLOAT,
    size: DataTypes.SMALLINT,
    weight: DataTypes.FLOAT,
    price: DataTypes.BIGINT,
    warranty_period: DataTypes.TINYINT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};