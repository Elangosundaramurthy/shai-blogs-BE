const Blog = require("../models/Blog");

exports.addBlog = async (req, res) => {
  try {
    const { heading, subHeading, content } = req.body;

    const coverImage = req.files["coverImage"]
      ? req.files["coverImage"][0].filename
      : null;

    const mainImage = req.files["mainImage"]
      ? req.files["mainImage"][0].filename
      : null;

    const newBlog = new Blog({
      heading,
      subHeading,
      coverImage,
      mainImage,
      content
    });

    await newBlog.save();

    res.status(201).json({
      message: "Blog added successfully",
      data: newBlog
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Blogs fetched successfully",
      count: blogs.length,
      data: blogs
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fs = require("fs");
const path = require("path");

exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const { heading, subHeading, content } = req.body;

    // Update text fields
    if (heading) blog.heading = heading;
    if (subHeading) blog.subHeading = subHeading;
    if (content) blog.content = content;

    // If new cover image uploaded
    if (req.files["coverImage"]) {
      // Delete old image
      if (blog.coverImage) {
        const oldPath = path.join(__dirname, "../uploads/", blog.coverImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      blog.coverImage =
        "coverImage/" + req.files["coverImage"][0].filename;
    }

    // If new main image uploaded
    if (req.files["mainImage"]) {
      if (blog.mainImage) {
        const oldPath = path.join(__dirname, "../uploads/", blog.mainImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      blog.mainImage =
        "mainImage/" + req.files["mainImage"][0].filename;
    }

    await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      data: blog
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};