'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  orders_products.init({
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orders_products',
    timestamps: false
  });
  return orders_products;
};