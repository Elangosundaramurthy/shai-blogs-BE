const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

class App {
  constructor() {
    this.app = express();
    this.database();
    this.middleware();
    this.routes();
    this.server();
  }

  database() {
    mongoose
      .connect(
        "mongodb+srv://elangos:12345@cluster0.exrrntc.mongodb.net/shai_blogs",
      )
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
      });
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.send("API is running...");
    });

    this.app.use("/api", authRoutes);
    this.app.use("/api", blogRoutes);
    this.app.use("/uploads", express.static("uploads"));
  }

  server() {
    const PORT = process.env.PORT || 5000;
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

new App();
