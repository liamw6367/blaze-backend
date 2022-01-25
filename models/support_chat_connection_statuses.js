'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class support_chat_connection_statuses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  support_chat_connection_statuses.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'support_chat_connection_statuses',
    timestamps: false
  });
  return support_chat_connection_statuses;
};