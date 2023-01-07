"use strict";
const { faker } = require("@faker-js/faker");
const crypto = require("crypto");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const admin = {
      id: faker.datatype.uuid(),
      roleId: "0",
      email: "admin@admin.com",
      password: crypto.createHash("sha256").update("Parola1!").digest("hex"),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const users = [admin];

    for (let i = 0; i < 50; i++) {
      const newCustomer = {
        id: faker.datatype.uuid(),
        roleId: "1",
        email: faker.internet.email(),
        password: crypto.createHash("sha256").update("Parola1!").digest("hex"),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(newCustomer);
    }

    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
