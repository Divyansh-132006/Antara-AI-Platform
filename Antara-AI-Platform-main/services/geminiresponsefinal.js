import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_FINAL);
const PROMPT = process.env.GEMINI_SYSTEM_FINAL_SYNTHESIZER;

async function geminiresponsefinal(finalInput) {

  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  const response = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: finalInput }]
      }
    ],
    systemInstruction: PROMPT
  });

  return response.response.text();
}

export default geminiresponsefinal;
