const axios = require("axios");

const GITHUB_BASE = "https://api.github.com/users";

exports.fetchUserProfile = async (username) => {
  const { data } = await axios.get(`${GITHUB_BASE}/${username}`);
  return data;
};

exports.fetchUserRepos = async (username) => {
  const { data } = await axios.get(`${GITHUB_BASE}/${username}/repos`);
  return data;
};
