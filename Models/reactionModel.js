const mongoose = require("mongoose");
const validator = require("validator");

const reactionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, "please  add your userId also"],
    ref: "Profile",
  },
  reaction: {
    type: String,
    required: [true, "please provide a valid reaction"],
    enum: ["like", "love", "helpful", "unlike", "bad"],
  },

  blogId: {
    type: mongoose.Types.ObjectId,
    required: [true, "please  add your blog id also"],
    ref: "Blog",
  },
});
const Reactions = mongoose.model("Reactions", reactionSchema);
module.exports = Reactions;
