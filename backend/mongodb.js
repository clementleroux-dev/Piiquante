const mongoose = require("mongoose");
const USER = process.env.USER_DB;
const PASSWORD = process.env.PASSWORD_DB;
const DATABASE = process.env.NAME_DATABASE;
const uri = `mongodb+srv://${USER}:${PASSWORD}@${DATABASE}.eqexxqm.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
//Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("connected to Mongodb"))
  .catch((error) => console.error({ error }));
