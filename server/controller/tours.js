
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
  const { title, description, cities, startDate, endDate, photos, userId } = req.body;

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

export { getTours ,postTours};