'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ OrderForm }) {
      // define association here
      this.hasMany(OrderForm, { foreignKey: "id_coupon" });
    }
  }
  Coupon.init({
    couponCode: DataTypes.STRING,
    discount: DataTypes.MEDIUMINT,
    isUsed: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Coupon',
  });
  return Coupon;
};