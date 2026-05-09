const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../../config/cloudinary.config");
const GithubProfileModel = require("../models/GithubProfile.model");
const { getPublicIdFromUrl, log } = require("../utils/index.utils");
const GithubProfile = require("../models/GithubProfile.model");

const {
  fetchGithubProfile,
  fetchGithubRepos,
} = require("../services/github.service");

const { processGithubAnalytics } = require("../utils/index.utils");
const { generateDevPersonality } = require("../services/ai.service");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, github_username } = req.body;
    console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        message: "User already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      github_username,
    });

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "Signup successful 🚀",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(400).json({
        message: "User not found",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Invalid credentials",
      });

    const token = generateToken(user._id);

    user.password = undefined;
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({
      message: "Login successful ✅",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.logout = async (_, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logout successful 👋",
      user: {},
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
exports.adminSignup = async (req, res) => {
  try {
    const { name, email, password, adminSecret, github_username } = req.body;

    if (adminSecret !== process.env.ADMIN_SECRET)
      return res.status(403).json({
        message: "Unauthorized to create admin",
      });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        message: "User already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      github_username,
    });

    const token = generateToken(admin._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Admin created successfully 🚀",
      user: admin,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = req.user;

    const { github_username } = req.query;

    // =====================================
    // 🔥 NORMALIZE USERNAME
    // =====================================

    const normalizedUsername = github_username?.trim()?.toLowerCase();

    // =====================================
    // 🔥 CHECK USERNAME
    // =====================================

    if (!normalizedUsername) {
      return res.status(400).json({
        success: false,
        message: "GitHub username missing",
      });
    }

    // =====================================
    // 🔥 FIND EXISTING PROFILE
    // =====================================

    let existingProfile = await GithubProfile.findOne({
      username: normalizedUsername,
    });

    // =====================================
    // 🔥 CACHE LOGIC
    // =====================================

    const TWELVE_HOURS = 1000 * 60 * 60 * 12;

    const shouldRefresh =
      !existingProfile ||
      !existingProfile.last_fetched ||
      Date.now() - new Date(existingProfile.last_fetched).getTime() >
        TWELVE_HOURS;

    let githubProfile;

    // =====================================
    // 🔥 REFRESH PROFILE
    // =====================================

    if (shouldRefresh) {
      // =====================================
      // 🔥 FETCH GITHUB DATA
      // =====================================

      const githubUser = await fetchGithubProfile(normalizedUsername);

      const repos = await fetchGithubRepos(normalizedUsername);

      // =====================================
      // 🔥 ANALYTICS
      // =====================================

      const analytics = processGithubAnalytics(repos);

      // =====================================
      // 🔥 AI DATA
      // =====================================

      const aiData = await generateDevPersonality({
        totalRepos: githubUser.public_repos,

        totalStars: analytics.totalStars,

        topLanguage: analytics.topLanguage,

        followers: githubUser.followers,
      });

      // =====================================
      // 🔥 STREAK
      // =====================================

      const streak = Math.floor(Math.random() * 100) + 1;

      // =====================================
      // 🔥 RECENT ACTIVITY
      // =====================================

      const recentActivity = repos
        .slice(0, 5)
        .map((repo) => `Worked on ${repo.name}`);

      // =====================================
      // 🔥 SAVE / UPDATE PROFILE
      // =====================================

      githubProfile = await GithubProfile.findOneAndUpdate(
        {
          username: normalizedUsername,
        },

        {
          // =====================================
          // 🔥 BASIC INFO
          // =====================================

          username: githubUser.login.toLowerCase(),

          display_name: githubUser.name || githubUser.login,

          github_id: githubUser.id,

          avatar_url: githubUser.avatar_url,

          profile_url: githubUser.html_url,

          bio: githubUser.bio,

          company: githubUser.company,

          location: githubUser.location,

          blog: githubUser.blog,

          twitter_username: githubUser.twitter_username,

          // =====================================
          // 🔥 SOCIAL
          // =====================================

          followers: githubUser.followers,

          following: githubUser.following,

          // =====================================
          // 🔥 REPOS
          // =====================================

          public_repos: githubUser.public_repos,

          public_gists: githubUser.public_gists,

          // =====================================
          // 🔥 ANALYTICS
          // =====================================

          total_stars: analytics.totalStars,

          total_forks: analytics.totalForks,

          total_watchers: analytics.totalWatchers,

          total_commits: analytics.totalCommits || 0,

          top_language: analytics.topLanguage,

          languages: analytics.languages,

          // =====================================
          // 🔥 AI
          // =====================================

          personality: aiData.personality,

          description: aiData.description,

          strength: aiData.strength,

          weakness: aiData.weakness,

          badge: aiData.badge,

          ai_insights: aiData.insights,

          // =====================================
          // 🔥 EXTRA
          // =====================================

          streak,

          recent_activity: recentActivity,

          last_fetched: new Date(),
        },

        {
          new: true,
          upsert: true,
        }
      );
    } else {
      // =====================================
      // 🔥 USE CACHED PROFILE
      // =====================================

      githubProfile = existingProfile;
    }

    // =====================================
    // 🔥 ATTACH PROFILE TO USER
    // =====================================

    user.github_profile = githubProfile._id;

    await user.save();

    // =====================================
    // 🔥 FINAL RESPONSE
    // =====================================

    return res.status(200).json({
      success: true,

      message: "Dashboard profile fetched successfully",

      data: {
        // =====================================
        // 🔥 VIEWER
        // =====================================

        viewer: {
          id: user._id,

          name: user.name,

          email: user.email,

          role: user.role,
        },

        // =====================================
        // 🔥 ANALYZED PROFILE
        // =====================================

        profile: {
          name: githubProfile.display_name || githubProfile.username,

          github_username: githubProfile.username,

          role: user.role,

          profile_image: githubProfile.avatar_url,

          personality: githubProfile.personality,

          badge: githubProfile.badge,

          description: githubProfile.description,

          strength: githubProfile.strength,

          weakness: githubProfile.weakness,

          streak: githubProfile.streak,

          bio: githubProfile.bio,

          company: githubProfile.company,

          location: githubProfile.location,
        },

        // =====================================
        // 🔥 MAIN STATS
        // =====================================

        stats: {
          repositories: githubProfile.public_repos,

          stars: githubProfile.total_stars,

          forks: githubProfile.total_forks,

          watchers: githubProfile.total_watchers,

          commits: githubProfile.total_commits,

          top_language: githubProfile.top_language,
        },

        // =====================================
        // 🔥 SOCIAL STATS
        // =====================================

        socialStats: {
          followers: githubProfile.followers,

          following: githubProfile.following,
        },

        // =====================================
        // 🔥 TECH STACK
        // =====================================

        techStack: githubProfile.languages,

        // =====================================
        // 🔥 ACTIVITY
        // =====================================

        recentActivity: githubProfile.recent_activity,

        // =====================================
        // 🔥 AI INSIGHTS
        // =====================================

        insights: githubProfile.ai_insights,

        // =====================================
        // 🔥 LINKS
        // =====================================

        links: {
          github: githubProfile.profile_url,

          blog: githubProfile.blog,
        },

        // =====================================
        // 🔥 META
        // =====================================

        meta: {
          lastFetched: githubProfile.last_fetched,

          cached: !shouldRefresh,
        },
      },
    });
  } catch (error) {
    console.log("PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to fetch profile",

      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, github_username } = req.body || {};

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let updateData = {};

    // ✅ NAME UPDATE
    if (typeof name === "string" && name.trim() !== "") {
      updateData.name = name.trim();
    }

    // 🔥 GITHUB USERNAME UPDATE
    if (
      typeof github_username === "string" &&
      github_username.trim() !== "" &&
      github_username !== user.github_username
    ) {
      try {
        const profileData = await fetchUserProfile(github_username);
        const reposData = await fetchUserRepos(github_username);

        const githubProfile = await GithubProfileModel.findOneAndUpdate(
          { username: profileData.login },
          {
            username: profileData.login,
            public_repos: profileData.public_repos,
            avatar_url: profileData.avatar_url,
            profile_url: profileData.html_url,
            last_fetched: new Date(),
          },
          { upsert: true, returnDocument: "after" } // 🔥 fix
        );

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

        updateData.github_username = github_username;
        updateData.github_profile = githubProfile._id;
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid GitHub username or fetch failed",
          error: err.message,
        });
      }
    }

    // 🖼️ IMAGE UPDATE
    if (req.file) {
      if (user.profile_image) {
        try {
          const publicId = getPublicIdFromUrl(user.profile_image);

          console.log("Deleting from Cloudinary:", publicId);

          if (publicId) {
            let res = await cloudinary.uploader.destroy(publicId);
            log(res);
          }
        } catch (err) {
          log("Old image delete failed:", err.message);
        }
      }

      updateData.profile_image = req.file.path;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided to update",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      returnDocument: "after",
      runValidators: true,
    }).populate("github_profile");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully 🚀",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Profile update failed",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const currentUser = req.user;
    const userToDelete = await User.findById(userId);

    if (!userToDelete)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    const isSelf = currentUser._id.toString() === userId;

    const isAdminDeletingUser =
      currentUser.role === "admin" && userToDelete.role === "user";

    if (!isSelf && !isAdminDeletingUser)
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this user",
      });

    if (userToDelete.role === "admin" && currentUser.role !== "admin")
      return res.status(403).json({
        success: false,
        message: "Admin account cannot be deleted",
      });

    if (userToDelete.profile_img)
      try {
        const publicId = userToDelete.profile_img
          .split("/")
          .slice(-3)
          .join("/")
          .split(".")
          .slice(0, -1)
          .join(".");

        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.log("Image delete failed:", err.message);
      }

    await User.findByIdAndDelete(userId);

    if (isSelf)
      res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });

    res.status(200).json({
      success: true,
      message: "User deleted successfully ❌",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User deletion failed",
      error: error.message,
    });
  }
};
