const express = require("express");
const blogController = require("../controller/blogController");
const router = express.Router();

router.post("/postBlog", blogController.postBlog);
router.get("/searchBlog/:search", blogController.searchBlog);
// post a comment based on blog
router.post("/postComments/:blogId", blogController.postComments);
//updatwd comment based on comment i and userId and blog id
router.patch("/updateComment/:commentId", blogController.updateComment);
//get all the comment based on blog
router.get("/blogComments/:blogId", blogController.blogComments);
// post a new reaction from the blog
router.post("/postReaction", blogController.postReaction);
// update  reaction by using reaction _id and blog and userId
router.patch("/updateReaction/:reactedId", blogController.updateReaction);
// blog readCount/view every read time
router.put("/viewCount/:blogId", blogController.viewCount);
// comment replay handle route based one single comment
router.put("/replyComment",blogController.replyComment)
module.exports = router;
