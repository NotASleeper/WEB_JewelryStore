'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PositionEmployee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Employee }) {
      // define association here
      this.hasMany(Employee, { foreignKey: "id_position" });
    }
  }
  PositionEmployee.init({
    name_position: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PositionEmployee',
  });
  return PositionEmployee;
};