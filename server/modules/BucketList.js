import { Schema,model } from "mongoose";

 const bucketlistSchema = new Schema({
    name:{ type : String, required: true},
 })