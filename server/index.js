import express from'express';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from './db.js';
import User from'./modules/user.js';


dotenv.config();

const app=express();
app.use(cors());
app.use(express.json()); 


const PORT =  process.env.PORT || 8080; 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost: port ${PORT}`);
  connectDB();
});

app.get("/", (req, res) => {
  res.send("welcome to Tiny Tours");
});

app.get("/health", (req, res) => {
 res.send({
  status: "ok",
  message: "server is healthy",
 });
});
 app.post("/signup",async (req, res) => {
  const {name,email,mobile,city,country,password} = req.body;
 const newUser=new User({
  name,
  email,
  mobile,
  city,
  country,
  password,
 }); 
 try{
  const savedUser= await newUser.save();
  return res.json ({
success: true,
message: "user registered successfully",
data: savedUser,
  });
 } catch(error){
  return res.json ({
    success:false,
    message:`user registration failed: ${error.message}`,
    data:null,
  });
 }

 });
 







