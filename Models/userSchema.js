const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provie your valid name"],
    min: [3, "name should be at least 4 character"],
  },
  username: {
    type: String,
    required: [true, "Please Choice a uique user name"],
    min: [3, "userName should be at least 4 character"],
  },
  about: String,
  password: {
    type: String,
    required: [true, "Please provide valid Password"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "please provide valid email"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Profile = mongoose.model("Profile", userSchema);

module.exports = Profile;

// const user = {

//     name: "Gias",
//     username: "Gias14",
//     password: "gias1234",
//     email:"gias@gmail.com"
// };
