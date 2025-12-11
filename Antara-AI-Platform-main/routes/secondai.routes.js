import express from 'express';
import geminiresponse2  from "../services/geminiresponse2.js";
const router = express.Router();
router.post('/antaraexpert', async (req,res)=>{
    try{
        const answer = await geminiresponse2(req.body.userProblem);
        res.json({answer});
    } catch(error){
        console.error("Error generatinf reponse:", error);
        res.status(500).send("Kuch to garbar hai Daya")
    }
})

export default router