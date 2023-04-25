const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.createBlogs)
  .put(blogController.updateBlogs)
  .delete(blogController.deleteBlogs);

module.exports = router;
