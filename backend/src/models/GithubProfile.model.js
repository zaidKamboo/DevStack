const mongoose = require("mongoose");

const githubProfileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },

    github_id: Number,

    avatar_url: String,

    profile_url: String,

    bio: String,

    company: String,

    location: String,

    blog: String,

    twitter_username: String,

    followers: Number,

    following: Number,

    public_repos: Number,

    public_gists: Number,

    total_stars: {
      type: Number,
      default: 0,
    },

    total_forks: {
      type: Number,
      default: 0,
    },

    total_watchers: {
      type: Number,
      default: 0,
    },

    total_commits: {
      type: Number,
      default: 0,
    },

    top_language: {
      type: String,
      default: "JavaScript",
    },

    languages: [
      {
        name: String,
        value: Number,
      },
    ],

    activity_graph: [
      {
        month: String,
        commits: Number,
      },
    ],

    recent_activity: [String],

    personality: String,

    badge: String,

    streak: Number,

    ai_insights: [
      {
        title: String,
        description: String,
      },
    ],

    last_fetched: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GithubProfile", githubProfileSchema);
