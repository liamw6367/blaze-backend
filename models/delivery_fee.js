'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class delivery_fee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  delivery_fee.init({
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'delivery_fee',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true,
  });
  return delivery_fee;
};