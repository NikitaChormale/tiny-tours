import User from"../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { JWT_EXPIRATION } from "../config.js";
 dotenv.config();
const postSignup =  async(req, res) => {
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
};
const postLogin =async(req,res) => {
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
    existingUser.password=undefined; //hide password in response

  if(ispasswordCorrect){

    const jwtToken = jwt.sign(
      {
        id:existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn:JWT_EXPIRATION,
      }
    );
    return res.json ({
      success:true,
      message: "login successfully",
      data: existingUser,
      jwttoken: jwtToken ,
      
    });
  }  else{
    return res.json ({
      success:false,
      message: "Invalid email or password",
      data: null,
    });
  }
};

export{postSignup,postLogin}