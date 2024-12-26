'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ PositionEmployee, Account, ImportForm, OrderForm, LiquidationForm, WarrantyMaintainance, RefundForm }) {
      // define association here
      this.belongsTo(PositionEmployee, { foreignKey: "id_position" });
      this.hasOne(Account, { foreignKey: "id_employee" });
      this.hasMany(ImportForm, { foreignKey: "id_employee" });
      this.hasMany(OrderForm, { foreignKey: "id_employee" });
      this.hasMany(LiquidationForm, { foreignKey: "id_employee_created" });
      this.hasMany(LiquidationForm, { foreignKey: "id_employee_accepted" });
      this.hasMany(WarrantyMaintainance, { foreignKey: "id_employee" });
      this.hasMany(RefundForm, { foreignKey: "id_employee" });
    }
  }
  Employee.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};