import express from "express";
import  antaraPipeline  from "../controllers/bestsolution.js";

const router = express.Router();

router.post("/antarahelp", async (req, res) => {
  try {
    const { userProblem } = req.body;

    if (!userProblem) {
      return res.status(400).json({ error: "Question is required" });
    }

    const result = await antaraPipeline(userProblem);

    res.json({
      answer: result.finalAnswer,
      safety: result.safety
    });

  } catch (error) {
    console.error("Antara AI Error:", error);
    res.status(500).json({ error: "Internal Antara AI failure" });
  }
});

export default router;
