import Tour from "../models/tour.js";
import dotenv from "dotenv";

 dotenv.config();

const getTours= async(req,res) => {
  const tours = await Tour.find({ user:req.user.id}).populate("user","-password");

  return res.json({
    success:true,
    message:"fetched tours successfully",
    data:tours,
  });
};
 const postTours =async (req, res) => {
  const { title, description, cities, startDate, endDate, photos, userId } =
   req.body;

  try {
    const newTour = new Tour({
      title,
      description,
      cities,
      startDate,
      endDate,
      photos,
      user:req.user.id ,
    });

    const savedTour = await newTour.save();

    return res.status(201).json({
      success: true,
      message: "Tour created successfully",
      data: savedTour,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Tour creation failed: ${error.message}`,
      data: null,
    });
  }
};

const putTours = async(req,res) => {
  const user= req.user;
  const userId= user.id;
  const {id } =req.params;

  const tour =await Tour.findById(id);
  if(! tour){
return res.json ({
  success:true,
  message:"tour not found ",
  data:null,
});
}
if(tour.user.toString()!==userId){
  return res.json ({
  success:false,
  message:"unauthorized to update this tour",
  data:null,
});
}

const {title, description ,cities,startDates,endDate ,photos}=
 req.body

 const  updatedTour = await tour.updateOne({_id:id},{
title, 
description ,
cities,
startDates,
endDate ,
photos,
 });


return res.json ({
  success:true,
  message:"tour  updated successfully ",
  data:updatedTour,
  user,
});
}
export { getTours ,postTours ,putTours};