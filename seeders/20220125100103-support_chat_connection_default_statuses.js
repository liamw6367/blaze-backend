'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('support_chat_connection_statuses', [
      {name: 'idle'},
      {name: 'active'},
      {name: 'finished'}
    ])
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('support_chat_connection_statuses', null, {});
  }
};
