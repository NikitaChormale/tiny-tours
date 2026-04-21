import React from 'react';
import { useEffect, useState} from 'react';
import {Link} from "react-router-dom"
import {getUserData,logoutUser} from "./../utils";
import Button from"./Button";
import {Toaster} from "react-hot-toast"


function Navbar() {
  const [userData, setUserData] = useState({});
   

   const fetchUserData =()=>{
      const data= getUserData();
      console.log("fetched user data", data);
      setUserData(data);
      
   }
    useEffect(()=>{
        fetchUserData();
    },[]);
  return (
    <div className='bg-blue-300 px-4 py-2 flex justify-around items-center'>
        <Link to="/">
     <div className="text-2xl font-bold text-black flex items-center gap-2">
          🌍 <span>TourMate</span>
        </div>
        </Link>
        <div>
          {userData?.name ?(
            <div>
              Hello,{userData.name}! 
               <Button  variant="secondary" title='Logout' onClick={logoutUser} />
              </div>
             
          ):
          (
         <Link className='bg-white text-black-500 px-3 py-1 
         rounded mr-2' to="/login">
          Login
         </Link>
          )}

        </div>
        <Toaster/>
    </div>
  )};


export default Navbar
