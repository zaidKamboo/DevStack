const mongoose = require("mongoose");

const repoSchema = new mongoose.Schema({
  repo_name: String,
  github_profile_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GithubProfile",
  },
  language: String,
  stars: Number,
  forks: Number,
});

module.exports = mongoose.model("Repository", repoSchema);
