const { DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class CustomerProfile extends Model {
    static associate(models) {
      CustomerProfile.hasOne(models.User, {
        foreignKey: "customerProfileId",
      });
    }
  }

  CustomerProfile.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
    },
    { sequelize }
  );
  return CustomerProfile;
};
