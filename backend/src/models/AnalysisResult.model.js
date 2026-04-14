const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  github_profile_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GithubProfile",
  },
  top_language: String,
  total_repos: Number,
  total_stars: Number,
  activity_score: Number,
  personality_type: String,
  analysis_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AnalysisResult", analysisSchema);
