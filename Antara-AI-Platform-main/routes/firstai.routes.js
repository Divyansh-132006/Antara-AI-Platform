import express from 'express';
import  geminiresponse from "../services/geminiresponse.js";
// import geminiresponse  from "../services/geminiresponse2.js";


const router = express.Router();

router.post('/antaramaster', async (req,res)=>{ // ayncs function use hoga kyuki gemini answer dene mai time lega
    try{
        const answer = await geminiresponse(req.body.userProblem);
        res.json({answer});
    } catch(error){
        console.error("Error generatinf reponse:", error);
        res.status(500).send("Kuch to garbar Daya")
    }

})

export default router