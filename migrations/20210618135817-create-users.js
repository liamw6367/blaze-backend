'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            role_id: {
                type: Sequelize.INTEGER
            },
            status_id: {
                type: Sequelize.INTEGER
            },
            first_name: {
                type: Sequelize.STRING
            },
            last_name: {
                type: Sequelize.STRING
            },
            username: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            birthday: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            avatar: {
                type: Sequelize.STRING
            },
            salary: {
                type: Sequelize.INTEGER
            },
            work_start: {
                type: Sequelize.STRING
            },
            work_end: {
                type: Sequelize.STRING
            },
            license: {
                type: Sequelize.INTEGER
            },
            paper: {
                type: Sequelize.INTEGER
            },
            password: {
                type: Sequelize.STRING
            },
            verification_code: {
                type: Sequelize.INTEGER
            },
            verified: {
                defaultValue: 0,
                type: Sequelize.INTEGER
            },
            created_at: {
                defaultValue: Sequelize.fn('NOW'),
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                defaultValue: Sequelize.fn('NOW'),
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};
