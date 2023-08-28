const express = require("express");
const app = express();
const dotenv = require("dotenv");

const dbConnect = require("./config/database");
const authRouter = require("./routes/authRoute");
const messengerRouter = require("./routes/messengerRoute");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "backend/config/config.env" });

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("This is from backend!");
});

app.use(bodyParser.json());

app.use(cookieParser());

app.use("/api/messenger", authRouter);
app.use("/api/messenger", messengerRouter);

dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});
