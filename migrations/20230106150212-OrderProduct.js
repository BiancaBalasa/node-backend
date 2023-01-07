"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orderProducts", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      orderId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "orders",
          },
          key: "id",
          onDelete: "cascade",
        },
      },
      productId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "products",
          },
          key: "id",
          onDelete: "cascade",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("orderProducts");
  },
};
