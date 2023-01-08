const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql")

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        customerProfileId: { type: GraphQLID },
        roleId: { type: GraphQLID }
    })
})

module.exports = UserType