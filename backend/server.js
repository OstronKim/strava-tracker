const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.port || 8080;

//uri is where our database is stored
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Middleware
app.use(cors());
app.use(express.json()); //Allows express to parse json

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
