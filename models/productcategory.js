'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, ServiceActivity, WarrantyMaintainance }) {
      // define association here
      this.hasMany(Product, { foreignKey: "id_category" });
      this.hasMany(ServiceActivity, { foreignKey: "id_category" });
      this.hasMany(WarrantyMaintainance, { foreignKey: "id_category" });
    }
  }
  ProductCategory.init({
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ProductCategory',
  });
  return ProductCategory;
};