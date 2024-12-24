'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ OrderForm, WarrantyMaintainance, RefundForm }) {
      // define association here
      this.hasMany(OrderForm, { foreignKey: "id_customer" });
      this.hasMany(WarrantyMaintainance, { foreignKey: "id_customer" });
      this.hasMany(RefundForm, { foreignKey: "id_customer" });
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.DATE,
    loyalty_point: DataTypes.SMALLINT,
    accumulated_point: DataTypes.SMALLINT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};