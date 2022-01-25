'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class support_chat_connections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  support_chat_connections.init({
    customer_id: DataTypes.INTEGER,
    support_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'support_chat_connections',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return support_chat_connections;
};