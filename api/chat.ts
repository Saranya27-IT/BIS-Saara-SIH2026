let response;
let lastError;

for (let attempt = 0; attempt < 5; attempt++) {
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

    if (attempt < 4) {
      const delay = 2000 * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

if (!response) {
  throw lastError || new Error("Gemini service temporarily unavailable");
}
