// db.js

const mongoose = require("mongoose");

const url = `mongodb+srv://sandeshze:${process.env.DB_PASSWORD}@cluster0.ywoxnzu.mongodb.net/eventsDB`;

let db;

async function connectToDatabase() {
  try {
    await mongoose.connect(url);
    db = mongoose.connection;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database connection not established");
  }
  return db;
}

module.exports = { connectToDatabase, getDB };
