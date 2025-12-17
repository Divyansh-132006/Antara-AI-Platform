import express from 'express';
import geminiresponsehallucination  from "../services/geminiresponsehallucination";
const router = express.Router();
router.post('/reasoning', async (req,res)=>{
    try{
        const answer = await geminiresponsehallucination(req.body.userProblem);
        res.json({answer});
    } catch(error){
        console.error("Error generatinf reponse:", error);
        res.status(500).send("Kuch to garbar hai Daya")
    }
})

export default router