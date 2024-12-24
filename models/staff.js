'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ PositionStaff, Account, ImportForm, OrderForm, LiquidationForm, WarrantyMaintainance, RefundForm }) {
      // define association here
      this.belongsTo(PositionStaff, { foreignKey: "id_position" });
      this.hasOne(Account, { foreignKey: "id_staff" });
      this.hasMany(ImportForm, { foreignKey: "id_staff" });
      this.hasMany(OrderForm, { foreignKey: "id_staff" });
      this.hasMany(LiquidationForm, { foreignKey: "id_staff_created" });
      this.hasMany(LiquidationForm, { foreignKey: "id_staff_accepted" });
      this.hasMany(WarrantyMaintainance, { foreignKey: "id_staff" });
      this.hasMany(RefundForm, { foreignKey: "id_staff" });
    }
  }
  Staff.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Staff',
  });
  return Staff;
};