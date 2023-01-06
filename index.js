const dotenv = require("dotenv").config();
const express = require("express");

const app = express();

const port = process.env.PORT;

const db = require("./models/index.js");
db.sequelize.sync({ force: true }); //this is to automatically modify the db

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
