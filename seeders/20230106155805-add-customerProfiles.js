"use strict";
const { faker } = require("@faker-js/faker");
const db = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const customerProfiles = [];

    for (let i = 0; i < 50; i++) {
      const newCustomerProfile = {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phoneNumber: faker.phone.number(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      customerProfiles.push(newCustomerProfile);
    }

    await queryInterface.bulkInsert("customerProfiles", customerProfiles, {});

    const users = await db.User.findAll({ where: { roleId: "1" } });
    for (let i = 0; i < users.length; i++) {
      await db.User.update(
        { customerProfileId: customerProfiles[i].id },
        { where: { id: users[i].dataValues.id } }
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("customerProfiles", null, {});
    await queryInterface.bulkUpdate("users", { customerProfileId: null }, null);
  },
};
