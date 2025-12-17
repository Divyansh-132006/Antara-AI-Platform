import express from 'express';
import  geminiresponseexplanation from "../services/geminiresponseexplanation.js";
const router = express.Router();

router.post('/explanation', async (req,res)=>{ // ayncs function use hoga kyuki gemini answer dene mai time lega
    try{
        const answer = await geminiresponseexplanation(req.body.userProblem);
        res.json({answer});
    } catch(error){
        console.error("Error generatinf reponse:", error);
        res.status(500).send("Kuch to garbar Daya")
    }
})
export default router