const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  deleteUser,
} = require("../../controllers/auth.controllers");

const { isLoggedIn } = require("../../middlewares/auth.middlewares");
const {
  uploadProfileImageMiddleware,
} = require("../../middlewares/uploadProfileImage");

router.get("/profile", isLoggedIn, getProfile);

router.put("/profile", isLoggedIn, uploadProfileImageMiddleware, updateProfile);

router.delete("/:userId", isLoggedIn, deleteUser);

module.exports = router;
