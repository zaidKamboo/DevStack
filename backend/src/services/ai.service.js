const { geminiModel } = "../../config/gemini-model.setup";

exports.generateDevPersonality = async (data) => {
  try {
    const prompt = `
        Act like a fun tech personality analyzer.

    Return JSON:

    {
     "personality": "",
     "description": "",
     "strength": "",
     "weakness": ""
    }

        Data:
        Repos: ${data.totalRepos}
        Stars: ${data.totalStars}
        Top Language: ${data.topLanguage}
        `;

    const result = await geminiModel.generateContent(prompt);

    const response = result.response.text();

    return response;
  } catch (err) {
    return "🧠 Consistent Builder - Reliable developer with steady growth.";
  }
};
