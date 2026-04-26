const axios = require("axios");

const githubAPI = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

module.exports = githubAPI;
