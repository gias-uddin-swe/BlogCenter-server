const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const { response } = require("express");
const Blog = require("../Models/BlogSchema");

exports.postBlog = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const blog = req.body;

  //Check if the object is valid
  if (
    blog && // 👈 null and undefined check
    Object.keys(blog).length === 0 &&
    Object.getPrototypeOf(blog) === Object.prototype
  ) {
    return res.status(400).json({
      success: false,
      error: "Empty blog",
      message: "Invalid Attempt.Provide all the values properly",
      errorId: "Insert failed",
    });
  }

  const response = await Blog.create(blog);

  if (!response) {
    return res.status(500).json({
      message: "can not post this blog please again",
      success: "false",
    });
  }
  res.status(200).json({ message: "success", response });
});

exports.searchBlog = catchAsync(async (req, res, next) => {
  const searchText = req.params.search;

  //   const response = await Blog.find({
  //     $text: { $search: searchText },
  //   });
  const regex = new RegExp(searchText, "ig");
  const response = await Blog.find({
    title: regex,
  });
    if (!response.length) {
       return res.status(500).json({
            message: "can not find any blog with your search text";
            success:false
      })
    }
    res.status(200).send({
        response,
        success: true,
        message:"here is some blog data that your search"
    })
});
