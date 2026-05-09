const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

exports.isLoggedIn = async (req, res, next) => {
  try {
    let token;

    // =====================================
    // 🔥 TOKEN
    // =====================================

    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login required",
      });
    }

    // =====================================
    // 🔥 VERIFY JWT
    // =====================================

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // =====================================
    // 🔥 GET USER
    // =====================================

    const user = await User.findById(decoded.id)

      .populate({
        path: "github_profile",
      })

      .select("-password");

    // =====================================
    // 🔥 USER NOT FOUND
    // =====================================

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // =====================================
    // 🔥 APPEND USER
    // =====================================

    req.user = user;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({
        message: "Admin access required",
      });

    next();
  } catch (error) {
    res.status(500).json({
      message: "Authorization error",
    });
  }
};
