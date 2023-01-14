const { GraphQLString, GraphQLNonNull } = require("graphql");
const { UserType, RegisterReturnType, TokenType } = require("./typeDef");
const crypto = require("crypto");
const db = require("../../models");
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

    const user = await db.User.create({
      email: args.email,
      password: crypto.createHash("sha256").update(args.password).digest("hex"),
      customerProfileId: customerProfile.dataValues.id,
      roleId: "1",
    });
    return { user, customerProfile };
  },
};

const loginMutation = {
  type: TokenType,
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
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const user = await db.User.findOne({
      where: {
        email,
        password: hashedPassword,
      },
      include: { model: db.Role },
    });

    if (!user) {
      return {
        token: null,
      };
    }

    if (user) {
      const token = jwt.sign(
        { userID: user.id, role: user.Role.name },
        process.env.JWT_SECRET
      );

      return {
        token,
      };
    }
  },
};

module.exports = {
  registerCustomer,
  loginMutation,
};
