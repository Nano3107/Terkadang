'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mobil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.order_detail, {
        foreignKey:"mobil_id", as: "order"
      })
    }
  }
  mobil.init({
    name: DataTypes.STRING,
    jenis : DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mobil',
  });
  return mobil;
};