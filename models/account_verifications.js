'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class account_verifications extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    account_verifications.init({
        email: DataTypes.STRING,
        secret: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'account_verifications',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return account_verifications;
};
