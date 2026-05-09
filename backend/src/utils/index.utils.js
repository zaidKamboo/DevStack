const log = (...args) => console.log(...args);
const getPublicIdFromUrl = (url) => {
  try {
    const parts = url.split("/upload/")[1];

    // remove version (v123/)
    const withoutVersion = parts.replace(/^v\d+\//, "");

    // decode URL (%20 → space)
    const decoded = decodeURIComponent(withoutVersion);

    // remove extension
    const publicId = decoded.replace(/\.[^/.]+$/, "");

    return publicId;
  } catch (err) {
    return null;
  }
};
processGithubAnalytics = (repos) => {
  let totalStars = 0;
  let totalForks = 0;
  let totalWatchers = 0;

  const languageMap = {};

  repos.forEach((repo) => {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;
    totalWatchers += repo.watchers_count;

    if (repo.language) {
      languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
    }
  });

  const languages = Object.entries(languageMap).map(([name, value]) => ({
    name,
    value,
  }));

  const topLanguage =
    languages.sort((a, b) => b.value - a.value)[0]?.name || "JavaScript";

  return {
    totalStars,
    totalForks,
    totalWatchers,
    languages,
    topLanguage,
  };
};
module.exports = { log, getPublicIdFromUrl, processGithubAnalytics };
