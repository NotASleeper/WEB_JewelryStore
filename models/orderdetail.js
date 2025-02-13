'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ OrderForm, Product }) {
      // define association here
      this.belongsTo(OrderForm, { foreignKey: "id_order" });
      this.belongsTo(Product, { foreignKey: "id_product" });
    }
  }
  OrderDetail.init({
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'orderforms',
        key: 'id'
      }
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: DataTypes.TINYINT,
    request: DataTypes.STRING,
    surcharge: DataTypes.BIGINT,
    total: DataTypes.BIGINT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};