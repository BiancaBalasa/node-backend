const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID } = require("graphql")

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
        description: { type: GraphQLString }
    })
})

module.exports = ProductType