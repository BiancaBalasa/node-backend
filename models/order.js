const { DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Product, {
        foreignKey: "orderId",
        through: models.OrderProduct,
      });
      Order.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { sequelize }
  );
  return Order;
};
