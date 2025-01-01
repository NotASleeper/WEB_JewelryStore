'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LiquidationDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ LiquidationForm, Product }) {
      // define association here
      this.belongsTo(LiquidationForm, { foreignKey: "id_liq" });
      this.belongsTo(Product, { foreignKey: "id_product" });
    }
  }
  LiquidationDetail.init({
    id_liq: {
      allowNull: false,
      primaryKey: true,
      references: {
        model: "liquidationdetails",
        key: "id",
      },
      type: DataTypes.INTEGER
    },
    id_product: {
      allowNull: false,
      primaryKey: true,
      references: {
        model: "products",
        key: "id",
      },
      type: DataTypes.INTEGER
    },
    quantity: DataTypes.SMALLINT,
    price_down: DataTypes.BIGINT,
    total: DataTypes.BIGINT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'LiquidationDetail',
  });
  return LiquidationDetail;
};