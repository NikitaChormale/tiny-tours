import axios from 'axios';
import  { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import toast,{Toaster} from "react-hot-toast"
import { getUserjwtToken } from '../utils';


function Dashboard() {

  const {tours,setTours}=useState([]);

  const loadTours= async()=>{
    const userJwt= getUserjwtToken();


    const response = await axios.get("http://localhost:8080/tours",{
      headers:{
        Authorization:`Bearer ${userJwt}`,
      },
    });
    if (response.data.success){
      toast .success(response.data.message)
    }
    else{
      toast.error(response.data.message);
    }
  };

  useEffect(() =>{
    loadTours();
  }, []);
  
  return (
    <div>
        <Navbar/>
      <h1>DashBoard</h1>
      <Toaster/>
    </div>
  )
}

export default Dashboard
