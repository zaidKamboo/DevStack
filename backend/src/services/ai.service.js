const groq = require("../../config/groq.config");

exports.generateDevPersonality = async (data) => {
  try {
    const prompt = `
You are an AI developer personality analyzer.

Analyze the developer based on the data.

Return ONLY valid JSON.

Format:

{
  "personality": "",
  "description": "",
  "strength": "",
  "weakness": "",
  "badge": "",
  "insights": [
    {
      "title": "",
      "description": ""
    }
  ]
}

Developer Data:
- Total Repositories: ${data.totalRepos}
- Total Stars: ${data.totalStars}
- Top Language: ${data.topLanguage}
- Followers: ${data.followers}
`;

    // 🔥 GROQ API CALL
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",

      messages: [
        {
          role: "system",
          content:
            "You are an AI developer personality analyzer that ONLY returns valid JSON.",
        },

        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,

      max_tokens: 500,
    });

    // 🔥 RAW RESPONSE
    const raw = completion.choices[0].message.content;

    // 🔥 CLEAN JSON
    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // 🔥 PARSE JSON
    return JSON.parse(cleaned);
  } catch (err) {
    console.log("AI PERSONALITY ERROR:", err.message);

    // 🔥 FALLBACK RESPONSE
    return {
      personality: "Consistent Builder",

      description: "Reliable developer with steady growth.",

      strength: "Consistency and adaptability",

      weakness: "May overfocus on perfection",

      badge: "STEADY CODER",

      insights: [
        {
          title: "Growth Pattern",

          description: "Shows consistent repository activity.",
        },

        {
          title: "Preferred Stack",

          description:
            "Strong inclination toward modern JavaScript ecosystems.",
        },
      ],
    };
  }
};
