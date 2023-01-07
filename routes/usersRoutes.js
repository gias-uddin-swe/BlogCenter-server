const express = require("express");
const usersController = require("../controller/usersController");
const router = express.Router();

router.post("/signUp", usersController.signUp);
router.get("/allUsers", usersController.allUsers);

module.exports = router;






