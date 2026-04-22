import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getUserData, logoutUser } from "./../utils";
import Button from "./Button";
import { Toaster } from "react-hot-toast";

function Navbar() {
  const [userData, setUserData] = useState({});

  const fetchUserData = () => {
    const data = getUserData();
    setUserData(data);
  };

  const handleLogout = () => {
    logoutUser();
    setUserData({});
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className='bg-blue-300 px-4 py-2 flex justify-around items-center'>
      
      <Link to="/">
        <div className="text-2xl font-bold text-black flex items-center gap-2">
          🌍 <span>TourMate</span>
        </div>
      </Link>

      <div>
        {userData?.name ? (
          <div className='flex items-center gap-2'>
            <span className='bg-black text-white flex items-center justify-center rounded-full h-8 w-8'>
              {userData?.name[0]}
            </span>
            <span>Hello, {userData.name}!</span>
            <Button variant=" danger" title='Logout' onClick={handleLogout} />
          </div>
        ) : (
          <Link className='bg-white text-black px-3 py-1 rounded mr-2' to="/login">
            Login
          </Link>
        )}
      </div>

      <Toaster />
    </div>
  );
}

export default Navbar;