const mongoose = require("mongoose");

module.exports = async () => {
  // const URL = "mongodb://20.244.50.254:27017/goair";
  const URL = "mongodb://localhost:27017/goair";
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Error while connecting with the database", err);
  }
};
