"use strict";

const { faker } = require("@faker-js/faker");
const db = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const customers = await db.User.findAll({ where: { roleId: "1" } });
    const orders = [];
    for (let i = 0; i < customers.length; i++) {
      const firstOrder = {
        id: faker.datatype.uuid(),
        userId: customers[i].dataValues.id,
        address: faker.address.streetAddress(),
        orderDate: faker.datatype.datetime({
          min: 1641563315000,
          max: 1673099315000,
        }),
        finalised: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      orders.push(firstOrder);
      const secondOrder = {
        id: faker.datatype.uuid(),
        userId: customers[i].dataValues.id,
        address: faker.address.streetAddress(),
        orderDate: faker.datatype.datetime({
          min: 1641563315000,
          max: 1673099315000,
        }),
        finalised: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      orders.push(secondOrder);
    }

    await queryInterface.bulkInsert("orders", orders, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orders", null, {});
  },
};
