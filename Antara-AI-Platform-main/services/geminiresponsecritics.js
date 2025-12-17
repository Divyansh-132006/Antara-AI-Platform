import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_Critics);
const PROMPT = process.env.GEMINI_SYSTEM_CRITCIS;



async function geminiresponsecritics(userProblem) {

  

  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const response = await model.generateContent({
    contents: [
      {
        role: "user",              
        parts: [{ text: userProblem }] 
      }
    ],
    systemInstruction: PROMPT
  });


  const answer = response.response.text();  
  console.log("ANSWER:", answer);

  return answer;
}

export default geminiresponsecritics;
