const axios = require("axios");

const GITHUB_BASE = "https://api.github.com/users";

exports.fetchUserProfile = async (username) => {
  try {
    const { data } = await githubAPI.get(`/users/${username}`);
    return data;
  } catch (err) {
    throw new Error("GitHub profile fetch failed");
  }
};

exports.fetchUserRepos = async (username) => {
  try {
    let page = 1;
    let allRepos = [];

    while (true) {
      const { data } = await githubAPI.get(
        `/users/${username}/repos?per_page=100&page=${page}`
      );

      if (!data.length) break;

      allRepos = [...allRepos, ...data];
      page++;
    }

    return allRepos;
  } catch (err) {
    throw new Error("GitHub repos fetch failed");
  }
};
