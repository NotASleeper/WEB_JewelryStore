'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Employee }) {
      // define association here
      this.belongsTo(Employee, { foreignKey: "id" });
    }
  }
  EmployeeImage.init({
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EmployeeImage',
  });
  return EmployeeImage;
};