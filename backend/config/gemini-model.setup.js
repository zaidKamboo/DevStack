const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",

  generationConfig: {
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 500,
  },
});
