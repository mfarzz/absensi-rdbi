const bcrypt = require('bcrypt');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'tes@gmail.com',
        password: await bcrypt.hash('123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('users', [
      {
        firstName: 'M',
        lastName: 'Fariz',
        email: 'fariz@gmail.com',
        password: await bcrypt.hash('123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
