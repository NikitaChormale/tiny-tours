import { Schema,model } from "mongoose";

 const tourSchema = new Schema({
    
    title: {
      type: String,
      required: true,
      
    },

    description: {
      type: String,
      required: true, 
    },

    cities: {
      type: [String],
      required: true, 
    },
    startDate:{
     type:Date,

      },
     endDate:{
     type:Date,
     
      },
    photos: {
      type: [
        {
            imgurl:String,
            title: String,
            description: String,
        }
      ],
      default:[],
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
  });


 const Tour =model("Tour",tourSchema);

 export default Tour;