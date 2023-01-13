const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const catchAsync = require("../utils/catchAsync");
const { response } = require("express");
const Blog = require("../Models/BlogSchema");
const Comments = require("../Models/commentsModel");
const Reactions = require("../Models/reactionModel");

// post any blog by logged in user
exports.postBlog = catchAsync(async (req, res, next) => {
  const blog = req.body;
  console.log(blog);

  //   Check if the object is valid
  if (
    blog &&
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
  console.log(response);
  if (!response) {
    return res.status(500).json({
      message: "can not post this blog please again",
      success: "false",
    });
  }
  res.status(200).json({ message: "success", response });
});
// search any blog by use search texg
//if anyletter to the blog title then user will get the response
exports.searchBlog = catchAsync(async (req, res, next) => {
  const searchText = req.params.search;
  const regex = new RegExp(searchText, "ig");
  const response = await Blog.find({
    title: regex,
  });
  if (!response.length) {
    return res.status(500).json({
      message: "can not find any blog with your search text",
      success: false,
    });
  }
  res.status(200).send({
    response,
    success: true,
    message: "here is some blog data that your search",
  });
});
// post blog comments
exports.postComments = catchAsync(async (req, res, next) => {
  const comment = req.body;
  comment.blogId = req.params.blogId;
  if (
    !Object.keys(comment).length != 0 ||
    !Object.getPrototypeOf(comment) === Object.prototype ||
    !ObjectId.isValid(comment?.userId)
  ) {
    return res.status(400).json({
      response,
      success: false,
      message: "invalid request for comments",
    });
    // console.log("hello");
  }
  const response = await Comments.create(comment);
  console.log(response);
  if (!response.length) {
    return res.status(200).json({
      response,
      success: false,
      message: "can not insert new comment please try again",
    });
  }
  res.status(200).json({
    response,
    success: false,
    message: "successfully insert new comment",
  });
});
// get all blog comments by blog Id
exports.blogComments = catchAsync(async (req, res, next) => {
  const blogId = req.params.blogId;
  //   console.log(blogId);
  const response = await Comments.find({ blogId: blogId })
    .populate("userId", "name username -_id")
    .select("comment status -_id");

  console.log(response);
  // .populate({
  //   path: "userId",
  // })
  // .select("comments  -_id")
  // .exec((err, data) => {
  //   console.log(data[0]?.comments[0].comment);
  //   let temp = [];
  //   const comment = data[0]?.comments?.map((c) => {
  // console.log(c);
  //     temp.push({
  //       name: c.userId.name,
  //       userName: c.userId.username,
  //       commentId: c.userId._id,
  //       comment: data[0]?.comments[0].comment,
  //     });
  //   });

  res.status(200).send({
    response,
    message: "all of comments by this blog",
  });
  // });
});
// update single by userId and blogid and commentId
exports.updateComment = catchAsync(async (req, res, next) => {
  const { comment, blogId, userId } = req.body;
  const commentId = req.params.commentId;
  console.log(comment, blogId);
  if (!comment || !userId || !blogId || typeof comment != "string") {
    return res.status(404).send({
      success: false,
      message: "bad request for update comment",
    });
  }
  const response = await Comments.updateOne(
    { _id: commentId, blogId: blogId, userId: userId },
    {
      $set: {
        comment: comment,
      },
    }
  );
  console.log(response);
  if (response.modifiedCount <= 0) {
    return res.status(200).json({
      response,
      succes: false,
      message: "can not update this coment try again",
    });
  }

  res.status(200).json({
    response,
    succes: true,
    message: "successfully updated this comment",
  });
});
exports.postReaction = catchAsync(async (req, res, next) => {
  const reaction = req.body;
  if (!reaction && typeof reaction === "string") {
    return res.status(403).json({
      message: "bad request to post reaction",
      success: false,
    });
  }
  const response = await Reactions.create(reaction);

  if (!response) {
    return res.status(405).json({
      message: "can not post please try again",
      success: false,
    });
  }
  res.status(200).json({
    message: "wow you gived the reaction successfully",
    success: true,
    response,
  });
});
// update reaction
exports.updateReaction = catchAsync(async (req, res, next) => {
  const { reaction, blogId, userId } = req.body;
  const reactedId = req.params.reactedId;
  // console.log(reaction, blogId);
  if (!reaction || !userId || !blogId || typeof reaction != "string") {
    return res.status(404).send({
      success: false,
      message: "bad request for update comment",
    });
  }

  const reactionList = ["like", "love", "unlike", "helpful", "bad"];
  const isValidReact = reactionList.find((r) => r === reaction);
  // console.log(isValidReact);
  if (!isValidReact) {
    return res.status(404).send({
      success: false,
      message: "bad request for update commentt",
    });
  }
  const response = await Reactions.updateOne(
    { _id: reactedId, blogId: blogId, userId: userId },
    {
      $set: {
        reaction: reaction,
      },
    }
  );
  console.log(response);
  if (response.modifiedCount <= 0) {
    return res.status(200).json({
      response,
      succes: false,
      message: "can not update this coment try again",
    });
  }

  res.status(200).json({
    response,
    succes: true,
    message: "successfully updated this comment",
  });
});
// update view count on every single hit in this route (10 second);
exports.viewCount = catchAsync(async (req, res, next) => {
  const blogId = req.params.blogId;
  const previousViews = parseInt(req.body.views);
  const currentViews = previousViews + 1;
  console.log(!previousViews);
  if (!previousViews) {
    return res.status(405).json({
      success: false,
      message: "need to  previous views",
    });
  }
  const response = await Blog.updateOne(
    { _id: blogId },
    {
      $set: {
        views: currentViews,
      },
    }
  );
  if (response.modifiedCount <= 0) {
    return res.status(200).json({
      success: false,
      message: "can not update the views please try again leter",
    });
  }
  res.status(200).json({
    success: true,
    message: "views updated",
    response,
  });
});

exports.replyComment = catchAsync(async (req, res, next) => {
  const reply = req.body.reply;
  const commentId = req.params.commentId;
  const userId = req.body.userId;

  console.log(reply, commentId);
});
