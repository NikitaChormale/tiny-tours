import { Schema,model } from "mongoose";

 const UserSchema = new Schema({
    name:{ type : String,
       required: true,
      unique:true,
   },
   email:{
      type : String,
       required: true,
      unique:true,

   },
   mobile:{
      type:String,
   },
   city:{
      type:String,
   },
   country:{
      type: String,
   },
   password:{
      type:String,
      required:true,
   },
 });
 const user =model("user",UserSchema);

 export default user;