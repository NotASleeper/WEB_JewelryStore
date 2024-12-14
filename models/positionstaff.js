'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PositionStaff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Staff }) {
      // define association here
      this.hasMany(Staff, { foreignKey: "id_position" });
    }
  }
  PositionStaff.init({
    name_position: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PositionStaff',
  });
  return PositionStaff;
};