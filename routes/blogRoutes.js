const express = require("express");
const blogController = require("../controller/blogController");
const router = express.Router();

router.post("/postBlog", blogController.postBlog);
router.get("/searchBlog/:search", blogController.searchBlog);
router.post("/postComments/:blogId", blogController.postComments);
router.patch("/updateComment/:commentId", blogController.updateComment);
router.get("/blogComments/:blogId", blogController.blogComments);

// post a new reaction from the blog
router.post("/postReaction", blogController.postReaction);

// update  reaction by using reaction _id and blog and userId
router.patch("/updateReaction/:reactedId", blogController.updateReaction);


module.exports = router;
