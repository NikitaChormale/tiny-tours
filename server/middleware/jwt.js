import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const checkjwt= (req,res,next) =>{
   const { authorization} =req.headers;
  const token =authorization && authorization.split (" ")[1];

  try {
    const decoded= jwt.verify(token,process.env.JWT_SECRET);
    req.user= decoded;
    next();
   }
   catch(err){
    return res.json({
      success:true,
    message:` JWT Token:${err.message}`,
    data:null  
  });
   }
  }
export{ checkjwt};