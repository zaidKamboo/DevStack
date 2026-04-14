const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../../config/cloudinary.config");
const GithubProfileModel = require("../models/GithubProfile.model");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, github_username } = req.body;

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

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, github_username } = req.body;

    if (!name && !github_username && !req.file)
      return res.status(400).json({
        success: false,
        message: "No data provided to update",
      });

    const user = await User.findById(req.user._id);

    let updateData = {};

    if (name) updateData.name = name;

    if (github_username && github_username !== user.github_username) {
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
          { new: true, upsert: true }
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

    if (req.file) {
      if (user.profile_image) {
        try {
          const publicId = user.profile_image
            .split("/")
            .slice(-3)
            .join("/")
            .split(".")
            .slice(0, -1)
            .join(".");

          console.log("Deleting from Cloudinary:", publicId);

        //   const deletionResult = await cloudinary.uploader.destroy(publicId);
          console.log("Cloudinary Deletion Result:", deletionResult);
          //   const publicId = user.profile_image
          //     .split("/")
          //     .slice(-3)
          //     .join("/")
          //     .split(".")
          //     .slice(0, -1)
          //     .join(".");

          //   await cloudinary.uploader.destroy(publicId).then(()=>console.log("Deelted"));
        } catch (err) {
          console.log("Old image delete failed:", err.message);
        }
      }
      console.log(req.file);
      updateData.profile_image = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
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
