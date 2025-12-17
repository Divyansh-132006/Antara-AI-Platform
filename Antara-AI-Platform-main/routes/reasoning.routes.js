import express from 'express';
import geminiresponsereasoning  from "../services/geminiresponsereasoning.js";
const router = express.Router();
router.post('/reasoning', async (req,res)=>{
    try{
        const answer = await geminiresponsereasoning(req.body.userProblem);
        res.json({answer});
    } catch(error){
        console.error("Error generatinf reponse:", error);
        res.status(500).send("Kuch to garbar hai Daya")
    }
})

export default router