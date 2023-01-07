const { DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class OrderProduct extends Model {}

  OrderProduct.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize }
  );
  return OrderProduct;
};
