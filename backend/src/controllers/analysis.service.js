exports.generateStats = (repos) => {
  if (!repos || repos.length === 0)
    return {
      totalRepos: 0,
      totalStars: 0,
      totalForks: 0,
      topLanguage: "N/A",
      languageMap: {},
      activityScore: 0,
    };

  let totalStars = 0;
  let totalForks = 0;
  let languageMap = {};
  let recentActivityScore = 0;

  const now = new Date();

  repos.forEach((repo) => {
    totalStars += repo.stargazers_count || repo.stars || 0;
    totalForks += repo.forks_count || repo.forks || 0;

    if (repo.language)
      languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;

    if (repo.updated_at) {
      const updatedDate = new Date(repo.updated_at);
      const diffDays = (now - updatedDate) / (1000 * 60 * 60 * 24);

      if (diffDays < 30) recentActivityScore += 5;
      else if (diffDays < 90) recentActivityScore += 2;
    }
  });

  const topLanguage =
    Object.keys(languageMap).sort(
      (a, b) => languageMap[b] - languageMap[a]
    )[0] || "N/A";

  const activityScore =
    totalStars * 2 + totalForks * 1.5 + repos.length * 1 + recentActivityScore;

  return {
    totalRepos: repos.length,
    totalStars,
    totalForks,
    topLanguage,
    languageMap,
    activityScore: Math.round(activityScore),
  };
};
