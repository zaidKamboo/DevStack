const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  adminSignup,
  logout,
} = require("../../controllers/auth.controllers");
const { isLoggedIn, isAdmin } = require("../../middlewares/auth.middlewares");

router.post("/signup", signup);
router.post("/login", login);
router.post("/admin/signup", isLoggedIn, isAdmin, adminSignup);
router.post("/logout", isLoggedIn, logout);

module.exports = router;
