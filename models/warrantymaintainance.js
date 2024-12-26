'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WarrantyMaintainance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Employee, Customer, OrderForm, Product, ProductCategory, ServiceActivity }) {
      // define association here
      this.belongsTo(Employee, { foreignKey: "id_employee" });
      this.belongsTo(Customer, { foreignKey: "id_customer" });
      this.belongsTo(OrderForm, { foreignKey: "id_order" });
      this.belongsTo(Product, { foreignKey: "id_product" });
      this.belongsTo(ProductCategory, { foreignKey: "id_category" });
      this.belongsTo(ServiceActivity, { foreignKey: "id_activity" });
    }
  }
  WarrantyMaintainance.init({
    date_created: DataTypes.DATE,
    type: DataTypes.BOOLEAN,
    name_product: DataTypes.STRING,
    image: DataTypes.STRING,
    surcharge: DataTypes.MEDIUMINT,
    total_price: DataTypes.BIGINT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'WarrantyMaintainance',
  });
  return WarrantyMaintainance;
};