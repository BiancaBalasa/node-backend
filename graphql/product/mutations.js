const { GraphQLString, GraphQLFloat, GraphQLID } = require("graphql");
const ProductType = require("./typeDef");
const db = require("../../models");

const createProduct = {
  type: ProductType,
  args: {
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    description: { type: GraphQLString },
  },
  resolve: async (source, args, { tokenPayload }) => {
    if (tokenPayload.role !== "Admin") {
      return null;
    }
    const product = await db.Product.create(args);
    return product;
  },
};

const updateProduct = {
  type: ProductType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    description: { type: GraphQLString },
  },
  resolve: async (source, args, { tokenPayload }) => {
    const { id, name, price, description } = args;
    if (tokenPayload.role !== "Admin") {
      return null;
    }

    await db.Product.update(
      { name, price, description },
      {
        where: {
          id: id,
        },
      }
    );
    return db.Product.findByPk(id);
  },
};

const deleteProduct = {
  type: GraphQLString,
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (source, args, { tokenPayload }) => {
    if (tokenPayload.role !== "Admin") {
      return null;
    }
    const product = await db.Product.destroy({
      where: {
        id: args.id,
      },
    });
    return "Product deleted successfully";
  },
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
};
