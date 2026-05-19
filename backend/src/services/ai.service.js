const groq = require("../../config/groq.config");

exports.generateDevPersonality = async (data) => {
  try {
    // 🔥 SAFE USERNAME
    const username =
      data?.username &&
      data.username !== "undefined" &&
      data.username !== "null"
        ? data.username
        : null;

    // 🔥 USERNAME RULE
    const usernameInstruction = username
      ? `- Mention the username "${username}" naturally 2-3 times in the description`
      : `- NEVER mention any username or placeholder name`;

    const prompt = `
You are an advanced AI developer personality analyzer.

Analyze the developer using the provided GitHub statistics.

STRICT RULES:
- Return ONLY valid JSON
- Do NOT use markdown
- Keep the tone modern, premium, and professional
- Personality names should feel startup-style and trendy
- Description MUST contain EXACTLY 2 paragraphs
- EACH paragraph should contain around 140-160 words
${usernameInstruction}
- Make the analysis realistic and human-written
- Mention coding behavior, collaboration style, engineering mindset, consistency, scalability, and project-building attitude
- Avoid robotic wording
- Avoid repetitive phrases
- Never generate fake usernames
- Description should feel LinkedIn-share worthy
- Insights should feel meaningful and realistic

JSON FORMAT:

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
- Username: ${username || "Not Available"}
- Total Repositories: ${data.totalRepos || 0}
- Total Stars: ${data.totalStars || 0}
- Top Language: ${data.topLanguage || "JavaScript"}
- Followers: ${data.followers || 0}
`;

    // 🔥 GROQ API CALL
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",

          content: `
You are a professional AI developer personality engine.

VERY IMPORTANT RULES:
- Return ONLY clean valid JSON
- Never wrap response in markdown
- Never explain anything outside JSON
- Output must always be valid parsable JSON
- Description MUST contain exactly 2 long paragraphs
- Each paragraph MUST contain around 140-160 words
- Never generate fake usernames like Alex, Renzu, John, etc
- If username is unavailable, avoid mentioning any username
- Tone should feel realistic, premium, and human-written
- Personality names should sound futuristic and creative
- Avoid generic AI-sounding wording
- Keep response detailed and engaging
`,
        },

        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.85,

      max_tokens: 1600,
    });

    // =====================================
    // 🔥 RAW RESPONSE
    // =====================================

    const raw = completion?.choices?.[0]?.message?.content || "";

    // =====================================
    // 🔥 CLEAN RESPONSE
    // =====================================

    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // =====================================
    // 🔥 PARSE JSON
    // =====================================

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch (parseError) {
      console.log("JSON PARSE ERROR:", parseError.message);

      throw new Error("Invalid JSON returned from AI");
    }

    // =====================================
    // 🔥 VALIDATION FIXES
    // =====================================

    if (parsed.description && typeof parsed.description === "string") {
      // 🔥 REMOVE RANDOM PLACEHOLDER NAMES
      parsed.description = parsed.description
        .replace(/\b(Renzu|Alex|John|Michael|David)\b/gi, "")
        .trim();
    }

    return parsed;
  } catch (err) {
    console.log("AI PERSONALITY ERROR:", err.message);

    // 🔥 SAFE USERNAME
    const username =
      data?.username &&
      data.username !== "undefined" &&
      data.username !== "null"
        ? data.username
        : null;

    // 🔥 OPTIONAL USERNAME TEXT
    const introText = username
      ? `${username} demonstrates`
      : `This developer demonstrates`;

    // =====================================
    // 🔥 FALLBACK RESPONSE
    // =====================================

    return {
      personality: "Neon Stack Architect",

      description: `${introText} a highly adaptive and product-focused engineering mindset with a strong inclination toward building scalable, polished, and technically refined applications. The overall GitHub activity reflects consistency, experimentation, and deep curiosity toward modern software ecosystems. Repository diversity suggests a developer who enjoys learning through practical implementation while continuously improving technical abilities through frameworks, tooling, and real-world architecture experimentation. The coding behavior appears structured, maintainable, and performance-oriented, indicating strong awareness of engineering quality alongside user experience. Repository patterns and technology preferences suggest someone who thrives in environments demanding ownership, rapid iteration, and creative problem-solving. The profile reflects a modern builder mentality driven by curiosity, experimentation, and long-term growth. Technical activity also indicates strong discipline, continuous learning habits, and the ability to remain actively engaged in software development over long periods while refining development practices and engineering decision-making.\n\nBeyond technical execution, the profile reflects strong creator energy commonly associated with startup-focused developers and innovation-driven engineers. Consistent repository activity combined with evolving technical direction suggests an individual motivated by creativity, scalability, and impactful digital product development. The development style appears highly adaptable, allowing efficient work across frontend experiences, backend systems, APIs, and scalable architecture planning. Engineering decisions seem guided by maintainability, usability, and long-term product quality rather than temporary implementation shortcuts. At the same time, ambitious project-building tendencies may occasionally result in overengineering or spending additional effort refining details beyond practical requirements. Overall, the profile represents a forward-thinking developer with strong growth potential, modern engineering instincts, disciplined learning habits, and the ability to contribute effectively within collaborative, fast-paced, and innovation-oriented software environments where experimentation, ownership, and adaptability are highly valued.`,

      strength: "Scalable product thinking and rapid adaptability",

      weakness:
        "Can occasionally overengineer features while refining implementation details excessively",

      badge: "NEON CODE STRATEGIST",

      insights: [
        {
          title: "Engineering Style",

          description:
            "Strong preference toward scalable, polished, and production-focused full-stack application development.",
        },

        {
          title: "Learning Pattern",

          description:
            "Repository diversity indicates continuous experimentation and strong self-driven technical growth habits.",
        },

        {
          title: "Development Mindset",

          description:
            "Thrives in fast-paced environments involving ownership, innovation, collaboration, and iterative product building.",
        },

        {
          title: "Technical Identity",

          description:
            "Values maintainable architecture, modern technologies, performance optimization, and impactful user experiences.",
        },
      ],
    };
  }
};
