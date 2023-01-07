// const express = require("express");
// const mongoose = require("mongoose");
// const router = express.Router();
// const todoSchema = require("../todoSchema/TodoSchema");
// const Todo = new mongoose.model("Todo", todoSchema);
// const verifyToken = require("../midleware/verifyToken");

// // get all todos that

// // router.get("/", async (req, res) => {});

// // get a todo by id

// // router.get("/:id", async (req, res) => {});

// // post todo

// router.post("/post", async (req, res) => {
//   try {
//     const newTodo = new Todo(req.body);

//     await newTodo.save((err) => {
//       if (err) {
//         res.status(500).json({
//           error: err,
//         });
//       } else {
//         res.status(500).json({
//           message: "todo inserted successfully",
//         });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });
// // post multipol todo

// router.get("/all", async (req, res) => {
//   console.log("hiii");
//   try {
//     const newTodo = await Todo.find({});

//     if (newTodo) {
//       res.status(200).json({
//         newTodo,
//         message: "all user get successfully",
//       });
//     } else {
//       res.status(500).json({
//         message: "todo inserted successfully",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// // get one by text
// router.get("/:searchText", async (req, res) => {
//   const info = req.params.searchText;
//   console.log(info);
//   const data = await Todo.find({ title: { $regex: info, $options: "i" } });
//   res.status(200).json({ data: data, message: "get successfully" });
// });

// // update a todo bu Id

// router.put("/:id", async (req, res) => {});
// // delete a todo bu Id

// router.delete("/:id", async (req, res) => {});

// module.exports = router;
