import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { query, language } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({
        error: "Question is required"
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured"
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey
    });

    const languageName =
      language === "ta"
        ? "Tamil"
        : language === "hi"
        ? "Hindi"
        : "English";

    const prompt = `
You are BIS Saara, an intelligent assistant for the Bureau of Indian Standards (BIS).

User question:
${query}

Answer the question in ${languageName}.

Your answer must:
- Be clear and beginner-friendly.
- Focus on Indian Standards, BIS certification, ISI Mark, CRS, QCO, testing, licensing and consumer/industry compliance.
- Do not invent IS numbers, clauses, fees, dates or government rules.
- If exact information is unavailable, clearly say that the user should verify the latest information from official BIS sources.
- Give a practical answer in simple language.
- Do not claim that you accessed private BIS databases.
`;
let response;
let lastError;

for (let attempt = 0; attempt < 3; attempt++) {
  try {
    response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt
    });

    break;
  } catch (error: any) {
    lastError = error;

    const status = error?.status;

    if (status !== 503 && status !== 429) {
      throw error;
    }

    if (attempt < 2) {
      const delay = 1000 * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

if (!response) {
  throw lastError || new Error("Gemini service unavailable");
}

const answer =
  response.text || "Sorry, I could not generate an answer.";
    return res.status(200).json({
      answer
    });

  } catch (error) {
    console.error("Gemini API Error:", error);

    return res.status(500).json({
      error: "Unable to generate AI response"
    });
  }
}
