'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_statuses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_statuses.belongsTo(models.users,{foreignKey:'id'})
    }
  };
  user_statuses.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_statuses',
    timestamps: false
  });
  return user_statuses;
};
