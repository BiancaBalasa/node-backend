"use strict";
const { faker } = require("@faker-js/faker");
const db = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const orders = await db.Order.findAll();
    const products = await db.Product.findAll();
    const orderProducts = [];
    for (let i = 0; i < orders.length; i++) {
      const noOfProductsOfOrder = faker.datatype.number({ min: 1, max: 7 });
      const takenProducts = [];
      for (let j = 0; j < noOfProductsOfOrder; j++) {
        let productIndex = -1;
        while (productIndex < 0 || takenProducts.includes(productIndex)) {
          productIndex = faker.datatype.number({
            min: 0,
            max: products.length - 1,
          });
        }
        takenProducts.push(productIndex);
        const newOrderProduct = {
          id: faker.datatype.uuid(),
          orderId: orders[i].dataValues.id,
          productId: products[productIndex].dataValues.id,
          quantity: faker.datatype.number({ min: 1, max: 10 }),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        orderProducts.push(newOrderProduct);
      }
    }

    await queryInterface.bulkInsert("orderProducts", orderProducts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orderProducts", null, {});
  },
};
