'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      delivery_radius: {
        type: Sequelize.STRING
      },
      store_timing: {
        type: Sequelize.STRING
      },
      contact_person_name: {
        type: Sequelize.STRING
      },
      contact_number: {
        type: Sequelize.STRING
      },
      blaze_person_name: {
        type: Sequelize.STRING
      },
      blaze_person_number: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      store_email_id: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')

      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stores');
  }
};