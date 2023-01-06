"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      customerProfileId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "customerProfiles",
          },
          key: "id",
          onDelete: "cascade",
        },
      },
      roleId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "roles",
          },
          key: "id",
          onDelete: "cascade",
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
