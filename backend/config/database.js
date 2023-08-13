const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.log("MongoDB Error: ", error);
    });
};

module.exports = dbConnect;
