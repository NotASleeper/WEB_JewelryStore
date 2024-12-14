'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gemstone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      // define association here
      this.belongsTo(Product, { foreignKey: "id" });
    }
  }
  Gemstone.init({
    name: DataTypes.STRING,
    size: DataTypes.SMALLINT,
    weight: DataTypes.FLOAT,
    color: DataTypes.STRING,
    purity: DataTypes.FLOAT,
    certificate: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Gemstone',
  });
  return Gemstone;
};