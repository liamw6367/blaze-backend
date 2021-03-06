'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      orders.belongsToMany(models.products, {
        as: 'product_orders',
        through: models.orders_products,
        foreignKey: 'order_id'
      });


      orders.belongsTo(models.users, {foreignKey: 'user_id'});
    }
  };
  orders.init({
    user_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    checked_out: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orders',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return orders;
};