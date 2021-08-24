'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('user_statuses', [
      {name: 'inactive'},
      {name: 'not verified'},
      {name: 'active'}
    ])
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('user_statuses', null, {});
  }
};
