const mongoose = require("mongoose");

const githubProfileSchema = new mongoose.Schema({
  username: String,
  public_repos: Number,
  avatar_url: String,
  profile_url: String,
  last_fetched: Date,
});

module.exports = mongoose.model("GithubProfile", githubProfileSchema);
