import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API);
const PROMPT = process.env.GEMINI_SYSTEM_PROMPT;

const History = [];

async function geminiresponse2(userProblem) {

  History.push({
    role: "user",
    parts: [{ text: userProblem }]
  });

  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  const response = await model.generateContent({
    contents: History,
    systemInstruction: PROMPT
  });

  const answer = response.response.text();  
  console.log("ANSWER:", answer);

  History.push({
    role: "model",
    parts: [{ text: answer }]
  });

  return answer;
}

export default geminiresponse2;
