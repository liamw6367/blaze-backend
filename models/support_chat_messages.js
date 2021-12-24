'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class support_chat_messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  support_chat_messages.init({
    from_id: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    to_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'support_chat_messages',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return support_chat_messages;
};