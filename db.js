const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting MongoDB: ${error}`);
  }
};

module.exports = { connection };
