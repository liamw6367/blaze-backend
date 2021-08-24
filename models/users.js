'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
          users.belongsTo(models.user_statuses, {foreignKey: 'status_id'});
        }
    };
    users.init({
        role_id: DataTypes.INTEGER,
        status_id: DataTypes.INTEGER,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        birthday: DataTypes.STRING,
        gender: DataTypes.INTEGER,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        avatar: DataTypes.STRING,
        cover: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'users',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return users;
};
