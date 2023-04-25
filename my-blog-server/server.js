require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dbConnect = require("./config/dbConnect");
const PORT = 3500;

dbConnect();

app.use(cors());

app.use(express.json());

app.use("/", require("./routes/root"));
app.use("/blog", require("./routes/blog"));

mongoose.connection.once("open", () => {
  console.log("Mongoose is connected");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
