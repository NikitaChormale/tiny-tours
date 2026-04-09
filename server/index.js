import express from'express';
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './db.js';
//middelware
import { checkjwt } from './middleware/jwt.js';
dotenv.config();
// routes
import { getHome ,getHealth} from './controller/health.js';
import { postSignup ,postLogin} from './controller/auth.js';
import { getTours, postTours } from './controller/tours.js';



const PORT =  process.env.PORT || 8080; 

const app=express();
app.use(cors());
app.use(express.json()); 

//  health route 
app.get("/", getHome);
app.get("/health", getHealth);
// auth routes 
app.post("/signup",postSignup);
app.post ("/login",postLogin);
// tours routes
app.post("/tours",checkjwt, postTours );
app.get("/tours",checkjwt,getTours);



  
app.listen(PORT, () => {
  console.log(`Server running on http://localhost: port ${PORT}`);
  connectDB();
});



