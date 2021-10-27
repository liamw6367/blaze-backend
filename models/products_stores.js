'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products_stores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  products_stores.init({
    product_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'products_stores',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return products_stores;
};