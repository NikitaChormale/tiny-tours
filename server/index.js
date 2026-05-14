import express from'express';
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './db.js';
//middelware
import { checkjwt } from './middleware/jwt.js';
import  ImageKit from '@imagekit/nodejs'; // Node.js SDK

dotenv.config();
// routes
import { getHome ,getHealth} from './controller/health.js';
import { postSignup ,postLogin} from './controller/auth.js';
import { getTours, postTours, putTours } from './controller/tours.js';



const PORT =  process.env.PORT || 8080; 

const app=express();
app.use(express.json());
app.use(cors()); 

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});


//  health route 
app.get("/", getHome);
app.get("/health", getHealth);

app.get('/auth', function (req, res) {
  // Your application logic to authenticate the user
  const { token, expire, signature } = client.helper.getAuthenticationParameters();
  res.send({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
});

// auth routes 
app.post("/signup",postSignup);
app.post ("/login",postLogin);
// tours routes
app.post("/tours",checkjwt, postTours );
app.get("/tours",checkjwt,getTours);
app.put("/tours/:id",checkjwt,putTours)



  
app.listen(PORT, () => {
  console.log(`Server running on http://localhost: port ${PORT}`);
  connectDB();
});



