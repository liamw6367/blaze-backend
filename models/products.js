'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            products.belongsToMany(models.categories, {
                as: 'product_category', through: models.product_categories,
                foreignKey: 'product_id'});

            products.belongsToMany(models.stores, {
                as: 'product_stores', through: models.products_stores,
                foreignKey: 'product_id'});

            products.belongsToMany(models.orders, {
                as: 'product_orders',
                through: models.orders_products,
                foreignKey: 'product_id'
            });
        }
    };
    products.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        normal_price: DataTypes.INTEGER,
        sales_price: DataTypes.INTEGER,
        image: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'products',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return products;
};