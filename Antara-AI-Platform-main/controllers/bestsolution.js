import { GoogleGenerativeAI } from "@google/generative-ai";
import geminiresponse from "../services/geminiresponse.js";
import geminiresponse2 from "../services/geminiresponse2.js";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_SYSTEM_PROMPT_COMPARE);

const compareAIResponses = async (req, res) => {
  try {
    const { prompt } = req.body;

    const [answer1, answer2] = await Promise.all([
      geminiresponse(prompt),
      geminiresponse2(prompt)
    ]);

    const comparePrompt = `
Your task is to understand the original question, analyze both answers, fix mistakes, improve clarity, and produce one perfect final answer. Avoid special symbols and do not mention comparison.
Original question: "${prompt}"
Answer one:
${answer1}
Answer two:
${answer2}
`;

    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: comparePrompt
    });

    const response = await model.generateContent([
      {
        role: "user",
        parts: [{ text: "Generate the final improved answer." }]
      }
    ]);

    const finalAnswer = response.response.text();

    res.json({
      original_prompt: prompt,
      model1_output: answer1,
      model2_output: answer2,
      final_answer: finalAnswer
    });

  } catch (error) {
    console.error("Comparison Error:", error);
    res.status(500).json({ error: "Nahi Mila kuch" });
  }
};

export default compareAIResponses;
