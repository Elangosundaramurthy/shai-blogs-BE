const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const upload = require("../middleware/upload");

router.post(
  "/add-blog",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "mainImage", maxCount: 1 }
  ]),
  blogController.addBlog
);

router.get("/blog-list", blogController.getAllBlogs);

router.put(
  "/edit-blog/:id",
  upload.fields([ 
    { name: "coverImage", maxCount: 1 },
    { name: "mainImage", maxCount: 1 }
  ]),
  blogController.updateBlog
);
module.exports = router;