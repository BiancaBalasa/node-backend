const { GraphQLString, GraphQLNonNull } = require("graphql");
const { UserType, RegisterReturnType } = require("./typeDef");
const db = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerCustomer = {
  type: RegisterReturnType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (parent, args, context, info) => {
    const customerProfile = await db.CustomerProfile.create({
      firstName: args.firstName,
      lastName: args.lastName,
      phoneNumber: args.phoneNumber,
    });
    console.log(customerProfile.dataValues);
    const user = await db.User.create({
      email: args.email,
      password: args.password,
      customerProfileId: customerProfile.dataValues.id,
      roleId: "1",
    });
    return { user, customerProfile };
  },
};

const loginMutation = {
  type: UserType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (source, args) => {
    const { email, password } = args;

    const user = await db.User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        token: null,
      };
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (passwordMatches) {
      const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET);

      return {
        token,
      };
    }

    return {
      token: null,
    };
  },
};

module.exports = {
  registerCustomer,
  loginMutation,
};
