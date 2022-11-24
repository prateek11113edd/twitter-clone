const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/auth.routes"));
app.use("/api", require("./routes/tweet.routes"));

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
});

mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
