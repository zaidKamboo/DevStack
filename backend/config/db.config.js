const mongoose = require("mongoose");
const { log } = require( "../src/utils/index.utils" );
const connectDB = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => log("Connected to db Successfully."))
      .catch((err) => log("Error " + err));
  } catch (error) {
    log("❌ DB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
