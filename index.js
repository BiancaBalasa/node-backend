const dotenv = require("dotenv").config();
const express = require("express");
const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const productMutations = require("./graphql/product/mutations");
const userMutations = require("./graphql/user/mutations");
const JWTMiddleware = require("./middlewares/JWTMiddleware");

const app = express();
const { graphqlHTTP } = require("express-graphql");

const port = process.env.PORT;

const db = require("./models/index.js");
//db.sequelize.sync({ force: true }); //this is to automatically modify the db

const productQuery = require("./graphql/product/query");
const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...productQuery,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...productMutations,
    ...userMutations,
  }),
});

app.use(
  "/graphql",
  JWTMiddleware,
  graphqlHTTP({
    graphiql: true,
    schema: new GraphQLSchema({
      query: Query,
      mutation: Mutation,
    }),
  })
);

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
