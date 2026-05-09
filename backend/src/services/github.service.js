const axios = require("axios");

const GITHUB_BASE = "https://api.github.com/users";

exports.fetchGithubProfile = async (username) => {
  const { data } = await axios.get(`https://api.github.com/users/${username}`);

  return data;
};

exports.fetchGithubRepos = async (username) => {
  const { data } = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );

  return data;
};
