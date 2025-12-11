import express from "express";
import  compareAIResponses  from "../controllers/bestsolution.js";

const router = express.Router();

router.post("/bestresult", compareAIResponses);

export default router;
