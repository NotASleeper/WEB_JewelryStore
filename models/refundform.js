'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefundForm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Staff, Customer, OrderForm, Product }) {
      // define association here
      this.belongsTo(Staff, { foreignKey: "id_staff" });
      this.belongsTo(Customer, { foreignKey: "id_customer" });
      this.belongsTo(OrderForm, { foreignKey: "id_order" });
      this.belongsTo(Product, { foreignKey: "id_product" });
    }
  }
  RefundForm.init({
    date_created: DataTypes.DATE,
    note: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'RefundForm',
  });
  return RefundForm;
};