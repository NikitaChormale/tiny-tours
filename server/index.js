import express from'express';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from './db.js';

const app=express();
app.use(cors());
app.use(express.json()); 

const PORT =  process.env.PORT || 8080; 


app.listen(PORT, () => {
  console.log(`Server running on http://localhost: port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("welcome to Tint Tours");
});

app.get("/health", (req, res) => {
 res.send({
  status: "ok",
  message: "server is healthy",
 });
});




