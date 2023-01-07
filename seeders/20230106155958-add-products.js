"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [];
    for (let i = 0; i < 100; i++) {
      const newProduct = {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.datatype.float({ min: 1, max: 150 }).toFixed(2),
        description: faker.commerce.productDescription(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      products.push(newProduct);
    }
    await queryInterface.bulkInsert("products", products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
