'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("mobil", [
      {
      name: 'Toyota', jenis: `Penumpang`,
    
      createdAt: new Date(), updatedAt: new Date()
      },
      {
      name: `YAYAYA`, jenis: `Barang`,
   
      createdAt: new Date(), updatedAt: new Date()
    }
  ])
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
