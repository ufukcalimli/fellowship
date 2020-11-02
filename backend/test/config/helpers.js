const mongoose = require("mongoose");

module.exports.removeAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
};

module.exports.connectDb = async () => {
  const uri =
    "mongodb+srv://ufuk:TR8b7.!uHszmL2v@cluster0-cw8gx.mongodb.net/TEST_DATABASE?retryWrites=true&w=majority";
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw Error(error);
  }
};
