import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import User from '../Antara-AI-Platform-main/models/user.model.js'
import antaramaster from './routes/firstai.routes.js';
import antaraexpert from './routes/secondai.routes.js';
import bestsolution from './routes/compare.routes.js';
import signup from './routes/auth.route.js'
import mongoose from 'mongoose'
dotenv.config();
mongoose.connect(process.env.MONGO_DB_ANTARA_AI)
.then(() => {
  console.log("MongoDB connected successfully!");
}).catch(err => {
  console.error("Alert:- MongoDB connection error!:", err);
});


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.get('/', (req, res) => {
  res.send("Hello Users");
  console.log("Hello Users");
});

app.use('/api/antaramodel', antaramaster);
app.use('/api/antaramodel', antaraexpert);
app.use('/api/antaramodel', bestsolution);
app.use('/api/antaramodel', signup);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
