const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// connectDB

const connectDB = require("./db/connect");

//routers

const userRouter = require("./routes/users");

//middleware

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
