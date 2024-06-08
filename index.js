const express = require("express");
const transactionsRoute = require("./routes/transactions");
const userRoute = require("./routes/user");
const { connectToDatabase } = require("./connect");
require("dotenv").config();
const app = express();
const PORT = 8080;

app.use(express.json());

connectToDatabase(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRoute);
app.use("/api/transactions", transactionsRoute);

app.listen(PORT, () => console.log("app started at port: ", PORT));
