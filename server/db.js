import mongoose from 'mongoose';
const connectDB= async() => {
    try{
         const conn = await mongoose.connect[process.env.MONGODB_URI];
  if(conn){
    console.log("connected to mongodb");
  }
    } catch (error){
console.log(" error connecting to MONGODB ",error.message);

    }
 
   
};
  

export default connectDB;