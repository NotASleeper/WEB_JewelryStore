'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImportForm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Employee, Supplier, ImportDetail }) {
      // define association here
      this.belongsTo(Employee, { foreignKey: "id_employee", as: "create" });
      this.belongsTo(Employee, { foreignKey: "id_employee_accepted", as: "accept" });
      this.belongsTo(Supplier, { foreignKey: "id_supplier" });
      this.hasMany(ImportDetail, { foreignKey: "id_lot" });
    }
  }
  ImportForm.init({
    date_created: DataTypes.DATE,
    date_accepted: DataTypes.DATE,
    total_price: DataTypes.BIGINT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ImportForm',
  });
  return ImportForm;
};