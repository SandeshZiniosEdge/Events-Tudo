// app.js
require("dotenv").config();
const express = require("express");
const app = express();
const { connectToDatabase } = require("./db");
const routes = require("./routes/route");
import serverless from "serverless-http";

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api", routes);

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export const handler = serverless(api);
