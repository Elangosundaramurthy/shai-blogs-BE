const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.query;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate normal random token
    const newToken = crypto.randomBytes(32).toString("hex");

    // Replace old token
    user.token = newToken;
    await user.save();

    res.status(200).json({
      message: "Login successful",
      token: newToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
