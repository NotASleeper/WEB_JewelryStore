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
    static associate({ Staff, Supplier, ImportDetail }) {
      // define association here
      this.belongsTo(Staff, { foreignKey: "id_staff" });
      this.belongsTo(Supplier, { foreignKey: "id_supplier" });
      this.hasMany(ImportDetail, { foreignKey: "id_lot" });
    }
  }
  ImportForm.init({
    date_created: DataTypes.DATE,
    total_price: DataTypes.BIGINT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ImportForm',
  });
  return ImportForm;
};