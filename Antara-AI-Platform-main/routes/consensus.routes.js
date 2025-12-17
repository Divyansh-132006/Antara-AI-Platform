import express from 'express';
import geminiresponseconsensus  from "../services/geminiresponseconsensus.js";
const router = express.Router();
router.post('/critics', async (req,res)=>{
    try{
        const answer = await geminiresponseconsensus(req.body.userProblem);
        res.json({answer});
    } catch(error){
        console.error("Error generatinf reponse:", error);
        res.status(500).send("Kuch to garbar hai Daya")
    }
})

export default router