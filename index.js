const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(express.json());
const port = 5000;

const usersRoutes = require("./routes/usersRoutes");
const blogRoutes = require("./routes/blogRoutes");

// connect database Mongoose

mongoose
  .connect(
    "mongodb+srv://mydb1:gias0000@cluster0.ofkrvlo.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("database connection successfully"))
  .catch((err) => console.log(err));

// all todo route

app.get("/", (req, res) => {
  res.send("yess its working");
});

app.use("/users", usersRoutes);
app.use("/blog", blogRoutes);

// error handling function with express

// function errorHandler(err, req, res, next) {
//   if (req.headersSent) {
//     return next(err);
//   }
//   res.status(500).json({ error: err });
// }

// port listing at 500  server side

app.listen(port, () => {
  console.log("server runing at 5000" || port);
});
