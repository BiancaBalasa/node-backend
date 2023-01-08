const { GraphQLString, GraphQLID, GraphQLNonNull } = require("graphql")
const UserType = require("./typeDef")
const db = require('../../models')
const User = require('../../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = {
    type: UserType,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        customerProfileId: { type: GraphQLID },
        roleId: { type: GraphQLID }
    },
    resolve: async (parent, args, context, info) => {
        const user = await db.User.create(args)
        return user
    }
}

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
        const {
          email,
          password
        } = args;
      
        const user = await db.User.findOne({
          where: {
            email,
          }
        });
      
        if(!user) {
          return {
            token: null,
          }
        }
      
        const passwordMatches = await bcrypt.compare(password, user.password);
      
        if(passwordMatches) {
          const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET);
      
          return {
            token,
          }
        }
      
        return {
          token: null,
        }
      }
}

module.exports = {
    createUser,
    loginMutation
}