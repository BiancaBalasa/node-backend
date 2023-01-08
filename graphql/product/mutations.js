const { GraphQLString, GraphQLFloat, GraphQLID } = require("graphql")
const ProductType = require("./typeDef")
const db = require('../../models')
const Product = require('../../models/product')

const createProduct = {
    type: ProductType,
    args: {
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
        description: { type: GraphQLString }
    },
    resolve: async (parent, args, context, info, { tokenPayload }) => {
        if(!tokenPayload) {
            return null;
        }
        const product = await db.Product.create(args)
        return product
    }
}

const updateProduct = {
    type: ProductType,
    args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    },
    resolve: async (parent, args, context, info, { tokenPayload }) => {
        if(!tokenPayload) {
            return null;
        }

        const product = await db.Product.update(args, {
            where: {
                id: args.id
            }
        })
        return product
    }
}

const deleteProduct = {
    type: GraphQLString,
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (parent, args, context, info) => {
        const product = await db.Product.destroy({
            where: {
                id: args.id
            }
        })
        return "Product deleted successfully"
    }
}

module.exports = {
    createProduct,
    updateProduct, 
    deleteProduct
}