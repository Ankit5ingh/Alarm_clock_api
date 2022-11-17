require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const connectDB = async (url) => {
  return mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (result) => {
      console.log("connected", result);
    }
  );
};

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.DATABASE_URL);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

// app.use(express.static("./public2"));
app.use(express.json());

const htmlFile = require("./routes/mainRoute");
app.use("/", htmlFile);

const alarmRouter = require("./routes/route");
app.use("/alarm", alarmRouter);

start();
