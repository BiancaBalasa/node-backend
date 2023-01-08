const { GraphQLID, GraphQLList } = require("graphql");
const ProductType = require("./typeDef");
const db = require('../../models')
const Product = require('../../models/product')


const getProduct = {
    type: ProductType,
    args: {
        id: {type: GraphQLID}
    },
    resolve: async (parent, args, context, info) => {
        const product = await db.Product.findByPk(args.id)
        return product
    }
}

const getAllProducts = {
    type: new GraphQLList(ProductType),
    resolve: async (parent, args, context, info) => {
        const products = await db.Product.findAll({})
        return products
    }
}

module.exports = {
    getProduct,
    getAllProducts
}