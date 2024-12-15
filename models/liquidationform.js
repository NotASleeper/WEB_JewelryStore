'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LiquidationForm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Staff, LiquidationDetail }) {
      // define association here
      this.belongsTo(Staff, { foreignKey: "id_staff_created" });
      this.belongsTo(Staff, { foreignKey: "id_staff_accepted" });
      this.hasMany(LiquidationDetail, { foreignKey: "id_liq" });
    }
  }
  LiquidationForm.init({
    date_created: DataTypes.DATE,
    date_accepted: DataTypes.DATE,
    total_price: DataTypes.BIGINT,
    product_status: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'LiquidationForm',
  });
  return LiquidationForm;
};