import express from'express';
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './db.js';
import User from'./modules/user.js';
import bcrypt from "bcrypt";
import { get } from 'mongoose';

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json()); 


const PORT =  process.env.PORT || 8080; 
 
const getkeeper=(req,res,next ) =>{
  const {name,ismember}= req.body;
  console.log(`welcome,${name}`);

 if(ismember){
  next();
 } else{
  return res.json({
    message: "Access denied."
  });
 }
};

const testController= (req,res) =>{
  console.log("inside the controller");

  const random =Math.round ( Math.random() *100);

  res.json({message: "thank you", random });
};

app.post("/test", getkeeper,testController);

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
  const { name,email, mobile,city,country,password} = req.body;

  if(!name){
    return res.json({
      success: false,
      message:"name is required",
      data: null,
    });
  }

  if(!email){
    return res.json({
      success: false,
      message:"email is required",
      data: null,
    });
  }

  if(!password){
    return res.json({
      success: false,
      message:"password is required",
      data: null,
    })
  }

   const existinguser=await User.findOne({email});

   if (existinguser){
    return res.json({
      success:false,
      message:"user with this email already exists",
      data:null,
    });
   }

   const salt =bcrypt.genSaltSync(10);
   const encrytedpassword = bcrypt.hashSync(password,salt);


 const newUser=new User({
  name,
  email,
  mobile,
  city,
  country,
  password: encrytedpassword,
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

   app.post ("/login",async(req,res) => {
    const { email,password} = req.body;

    if(!email){
    return res.json({
      success: false,
      message:"email is required",
      data: null,
    });
  }
  if(!password){
    return res.json({
      success: false,
      message:"password is required",
      data: null,
    })
  
  }
  const existingUser=await User.findOne({email}) ;

  if(!existingUser){
    return res.json ({
      success:false,
      message: "user doesn't exist with this email , please sign up",
      data: null,
    });
  }
  const ispasswordCorrect =bcrypt .compareSync (password ,existingUser.password);
   

  if(ispasswordCorrect){
    return res.json ({
      success:true,
      message: "login successfully",
      data: existingUser,
    });
  } 
});






