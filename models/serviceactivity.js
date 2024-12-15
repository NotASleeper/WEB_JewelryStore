'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ProductCategory, WarrantyMaintainance }) {
      // define association here
      this.belongsTo(ProductCategory, { foreignKey: "id_category" });
      this.hasMany(WarrantyMaintainance, { foreignKey: "id_activity" });
    }
  }
  ServiceActivity.init({
    name_activity: DataTypes.STRING,
    price: DataTypes.MEDIUMINT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ServiceActivity',
  });
  return ServiceActivity;
};