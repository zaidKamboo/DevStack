const GithubProfile = require("../models/GithubProfile.model");
const Repository = require("../models/Repository.model");

const {
  fetchUserProfile,
  fetchUserRepos,
} = require("../services/github.service");

exports.analyzeGithub = async (req, res) => {
  try {
    const { username } = req.params;

    const profileData = await fetchUserProfile(username);
    const reposData = await fetchUserRepos(username);

    // 🔥 UPSERT PROFILE
    const profile = await GithubProfile.findOneAndUpdate(
      { username: profileData.login },
      {
        username: profileData.login,
        public_repos: profileData.public_repos,
        avatar_url: profileData.avatar_url,
        profile_url: profileData.html_url,
        last_fetched: new Date(),
      },
      { new: true, upsert: true }
    );

    // 🧹 Optional: purge old repos
    await Repository.deleteMany({ github_profile_id: profile._id });

    // 🔥 Insert fresh repos
    const repoDocs = reposData.map((repo) => ({
      repo_name: repo.name,
      github_profile_id: profile._id,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
    }));

    await Repository.insertMany(repoDocs);

    res.json({
      message: "GitHub data synced successfully 🚀",
      profile,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
