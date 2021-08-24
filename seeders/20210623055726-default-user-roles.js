'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('user_roles', [
            {name: 'admin'},
            {name: 'partner'},
            {name: 'employee'},
            {name: 'customer'}
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user_roles', null, {});
    }
};
