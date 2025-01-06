'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderForm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Customer, Employee, Coupon, OrderDetail, WarrantyMaintainance, RefundForm }) {
      // define association here
      this.belongsTo(Customer, { foreignKey: "id_customer" });
      this.belongsTo(Employee, { foreignKey: "id_employee" });
      this.belongsTo(Coupon, { foreignKey: "id_coupon" });
      this.hasMany(OrderDetail, { foreignKey: "id_order" });
      this.hasMany(WarrantyMaintainance, { foreignKey: "id_order" });
      this.hasMany(RefundForm, { foreignKey: "id_order" });
    }
  }
  OrderForm.init({
    is_used_point: DataTypes.BOOLEAN,
    total_price: DataTypes.BIGINT,
    date_created: DataTypes.DATE,
    date_payment: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    is_preordered: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'OrderForm',
  });
  return OrderForm;
};