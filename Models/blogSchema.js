const mongoose = require("mongoose");
const validator = require("validator");
// const isEmail = require("validator/lib/isEmail");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "please write the blog titile"],
  },
  description: {
    type: String,
    required: [true, "please write the blog description"],
  },
  blogBanner: {
    type: String,
    required: [true, "please provide a valid blog banner image link"],
    validate: {
      validator: function (v) {
        return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  author: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please insert the user id!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email!"],
      ref: "Profile",
    },
    userName: {
      type: String,
      required: [true, "Please Provide full name of user"],
    },
  },

  views: {
    type: String,
    default: 1,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

blogSchema.index({ "$**": "text" });
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

// const blog = {
//   "title": "this is blog",
//   "description": "description",
//   "blogBanner":
//     "https://github.com/Programming-Hero1/koncept-krackerz-server/blob/staging/routers/userRouter.js",
//   "author": { "email": "user@example.com", "userName": "John" },
//   "views": "0",
//   "comments": [{ "comment": "hello test", "userEmail": "gias@gmail.com" }],
//   "reaction": [{ "react": "love", "userEmail": "gias@gmail.com" }],
// };
