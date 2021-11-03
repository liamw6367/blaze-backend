'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class delivery_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  delivery_details.init({
    user_id: DataTypes.INTEGER,
    city: DataTypes.STRING,
    community: DataTypes.STRING,
    street: DataTypes.STRING,
    comments: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'delivery_details',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return delivery_details;
};