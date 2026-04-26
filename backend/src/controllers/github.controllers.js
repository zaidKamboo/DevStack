const User = require("../models/User.model");
const GithubProfile = require("../models/GithubProfile.model");
const Repository = require("../models/Repository.model");
const AnalysisResult = require("../models/AnalysisResult.model");

const {
  fetchUserProfile,
  fetchUserRepos,
} = require("../services/github.service");

const { generateStats } = require("./analysis.service");

const { generateDevPersonality } = require("../services/ai.service");
const { log } = require("../utils/index.utils");

exports.analyzeGithub = async (req, res) => {
  try {
    let username;
    let user = null;

    // 🟢 Logged-in
    if (req.user) {
      user = await User.findById(req.user._id);
      if (user?.github_username) {
        username = user.github_username;
      }
    }

    // 🟡 Guest (params > query > body)
    if (!username) {
      username = req.params.username || req.query.username || req.body.username;

      if (!username) {
        return res.status(400).json({
          message: "GitHub username is required",
        });
      }
    }
    log(username, "UN");
    // 🚀 1. Fetch GitHub Data
    const profileData = await fetchUserProfile(username);
    const reposData = await fetchUserRepos(username);

    // 📊 2. Generate Stats
    const stats = generateStats(reposData);

    // 🤖 3. AI Personality
    const aiResult = await generateDevPersonality({
      totalRepos: stats.totalRepos,
      totalStars: stats.totalStars,
      topLanguage: stats.topLanguage,
    });

    // 🔥 IF LOGGED IN → SAVE DATA
    let githubProfile = null;
    let analysis = null;

    if (user) {
      // upsert profile
      githubProfile = await GithubProfile.findOneAndUpdate(
        { username: profileData.login },
        {
          username: profileData.login,
          public_repos: profileData.public_repos,
          avatar_url: profileData.avatar_url,
          profile_url: profileData.html_url,
          last_fetched: new Date(),
        },
        { upsert: true, returnDocument: "after" }
      );

      // refresh repos
      await Repository.deleteMany({
        github_profile_id: githubProfile._id,
      });

      const repoDocs = reposData.map((repo) => ({
        repo_name: repo.name,
        github_profile_id: githubProfile._id,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      }));

      await Repository.insertMany(repoDocs);

      // save analysis
      analysis = await AnalysisResult.create({
        github_profile_id: githubProfile._id,
        top_language: stats.topLanguage,
        total_repos: stats.totalRepos,
        total_stars: stats.totalStars,
        activity_score: stats.activityScore,
        personality_type: aiResult,
      });

      // link user
      user.github_profile = githubProfile._id;
      await user.save();
    }

    // 🚀 RESPONSE (COMMON)
    res.json({
      success: true,
      username,
      stats,
      personality: aiResult,
      profile: githubProfile || profileData, // guest gets raw profile
      analysis: analysis || null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Analysis failed",
      error: error.message,
    });
  }
};
