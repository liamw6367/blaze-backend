'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class forgot_pass_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  forgot_pass_tokens.init({
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'forgot_pass_tokens',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return forgot_pass_tokens;
};
