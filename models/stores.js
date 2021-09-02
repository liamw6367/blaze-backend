'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  stores.init({
    name: DataTypes.STRING,
    area: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    delivery_radius: DataTypes.STRING,
    store_timing: DataTypes.STRING,
    contact_person_name: DataTypes.STRING,
    contact_number: DataTypes.STRING,
    blaze_person_name: DataTypes.STRING,
    address: DataTypes.STRING,
    store_email_id: DataTypes.STRING,
    password: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'stores',
  });
  return stores;
};