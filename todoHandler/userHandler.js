// const express = require("express");
// const mongoose = require("mongoose");
// const router = express.Router();
// const userSchema = require("../todoSchema/userSchema");
// const User = new mongoose.model("User", userSchema);
// const bcrypt = require("bcrypt");
// var jwt = require("jsonwebtoken");
// const verifyToken = require("../midleware/verifyToken");

// router.post("/signup", async (req, res) => {
//   try {
//     const hashedPass = await bcrypt.hash(req.body.password, 10);
//     const newUser = await new User({
//       username: req.body.username,
//       name: req.body.name,
//       password: hashedPass,
//       about: req.body.about,
//     });
//     newUser.save((err) => {
//       res.status(500).json({ message: "signup faild save error !!!!" });
//     });
//     console.log(hashedPass);

//     res.status(200).json({
//       message: "user sign up successfully",
//       //   newUser,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "signup faild !!!!" });
//   }
// });

// // sign in or login code from here
// router.post("/login", async (req, res) => {
//   const newUser = await User.find({ username: req.body.username });

//   if (newUser && newUser.length > 0) {
//     const validUserPass = await bcrypt.compare(
//       req.body.password,
//       newUser[0].password
//     );
//     if (validUserPass) {
//       var token = jwt.sign(
//         { username: newUser[0]?.username, userId: newUser[0]?._id },
//         process.env.Token_Secret,
//         {
//           expiresIn: "1h",
//         }
//       );
//       if (token) {
//         console.log(token);
//         res.status(200).json({ message: "succesfully login ", token });
//       } else {
//         console.log("can not genarate token");
//         res.status(400).json({ message: "can not genarate token" });
//       }
//     } else {
//       res.status(400).json({ message: "password athentication  faild" });
//     }
//   } else {
//     res.status(401).json({ message: "user not found" });
//   }
// });
// module.exports = router;
