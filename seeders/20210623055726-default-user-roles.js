'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('user_roles', [
            {name: 'admin'},
            {name: 'store admin'},
            {name: 'customer'},
            {name: 'driver'},
            {name: 'operator'}
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user_roles', null, {});
    }
};
