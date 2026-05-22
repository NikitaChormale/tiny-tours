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
//edit tour
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
// delete tour

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
const getTourById =async(req,res) =>{
  const{id}= req.params;
const tour =await Tour.findById(id).populate("user","-password")
if(! tour){
  return res.json({
    success:false,
    message:"tour not found",
    data:null,
  });
}
return res.json({
  success:true,
  message:"tour fetched successfully",
  data:tour,
});
}
const deleteTour = async (req, res) => {

  try {

    const { id } = req.params;

    const tour = await Tour.findById(id);

    if (!tour) {
      return res.json({
        success: false,
        message: "Tour not found",
      });
    }

    // check owner
    if (tour.user.toString() !== req.user.id) {

      return res.json({
        success: false,
        message: "Unauthorized",
      });

    }

    await Tour.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Tour deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export { getTours ,postTours ,putTours,getTourById, deleteTour,};