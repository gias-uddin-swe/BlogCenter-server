const mongoose = require("mongoose");
const validator = require("validator");

const commentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, "please  add your userId also"],
    ref: "Profile",
  },
  comment: {
    type: String,
    required: [true, "please add your comment"],
  },
  status: {
    type: String,
    required: false,
    enum: ["onlyMe", "public"],
    default: "public",
  },

  blogId: {
    type: mongoose.Types.ObjectId,
    required: [true, "please  add your blog id also"],
    ref: "Blog",
  },
  replays: [
    {
      replyText: String,
      replierUId: mongoose.Types.ObjectId,
      replierName: String,
      replierUName: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;

const comment = {
  userId: "63b919840ae5303938fb1c17",
  comment: "first comment",
  status: "public",
  blogId: "63bc20741475b40323d6259f",
};
