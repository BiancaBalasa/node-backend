const { DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class OrderProduct extends Model {
    static associate(models) {
      OrderProduct.hasOne(models.User, {
        foreignKey: "customerProfileId",
      });
    }
  }

  OrderProduct.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      quantitiy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize }
  );
  return OrderProduct;
};
