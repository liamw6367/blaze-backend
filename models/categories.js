'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class categories extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            categories.belongsToMany(models.products, {
                as: 'products',
                through: models.product_categories,
                foreignKey: 'category_id'
            });
        }
    };
    categories.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        banner: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        is_active: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'categories',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return categories;
};