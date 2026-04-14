const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    github_username: String,

    // 🔥 RELATION
    github_profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GithubProfile",
    },

    role: {
      type: String,
      default: "user",
    },
    profile_image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
