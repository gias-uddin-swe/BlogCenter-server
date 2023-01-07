const express = require("express");
const blogController = require("../controller/blogController");
const router = express.Router();

router.post("/postBlog", blogController.postBlog);
router.get("/searchBlog/:search", blogController.searchBlog);

module.exports = router;
