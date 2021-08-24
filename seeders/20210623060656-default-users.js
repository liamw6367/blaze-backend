'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Getting 'active' status id
        const status_id = await queryInterface.rawSelect('user_statuses', {
            where: {
                name: 'active'
            },
        }, ['id']);

        // Admin role
        const admin_role_id = await queryInterface.rawSelect('user_roles', {
            where: {
                name: 'admin'
            },
        }, ['id']);

        return queryInterface.bulkInsert('users', [
            {
                first_name: 'John',
                last_name: 'Doe',
                birthday: '1986-03-30',
                gender: 0,
                email: 'admin@gmail.com',
                password: bcrypt.hashSync('12345678', 10),
                role_id: admin_role_id,
                status_id: status_id
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
