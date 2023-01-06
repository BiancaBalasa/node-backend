const { DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Order, {
        foreignKey: "productId",
        through: models.OrderProduct,
      });
    }
  }

  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    { sequelize }
  );
  return Product;
};
