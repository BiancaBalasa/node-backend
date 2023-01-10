const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    customerProfileId: { type: GraphQLID },
    roleId: { type: GraphQLID },
  }),
});

const TokenType = new GraphQLObjectType({
  name: "Token",
  fields: () => ({
    token: { type: GraphQLString }
  }),
});

const CustomerProfileType = new GraphQLObjectType({
  name: "CustomerProfile",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
  }),
});

const RegisterReturnType = new GraphQLObjectType({
  name: "RegisterReturn",
  fields: () => ({
    user: { type: UserType },
    customerProfile: { type: CustomerProfileType },
  }),
});

module.exports = { UserType, RegisterReturnType, TokenType };
