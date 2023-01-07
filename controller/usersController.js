const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const { response } = require("express");
const Profile = require("../Models/userSchema");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// SignUP User

exports.signUp = catchAsync(async (req, res, next) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUser = await new Profile({
      username: req.body.username,
      name: req.body.name,
      password: hashedPass,
      about: req.body.about,
      email: req.body.email,
    });

    console.log(req.body);

    newUser.save(function (err, post) {
      if (err) {
        return next(err);
      }
      res.json(201, post);
    });

    res.status(200).json({
      status: "success",
      message: "user sign up successfully",
    });
    console.log(newUser);
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "signup faild !!!!" });
  }
});

exports.allUsers = catchAsync(async (req, res, next) => {
  const data = await Profile.find({});
  console.log(data);
  res.status(200).json({
    data,
    status: "success",
    message: "you get all of users list",
  });
});
