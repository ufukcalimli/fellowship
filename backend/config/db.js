const mongoose = require("mongoose");
require("dotenv").config();

const logger = require('./logger')

const connectDb = async () => {
  try { 
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    logger.info("MongoDB connected.");
  } catch (error) {
    logger.error(error);
  }
};

module.exports = connectDb;
