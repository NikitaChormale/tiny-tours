import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getUserData, logoutUser } from "./../utils";
import Button from "./Button";
import { Toaster } from "react-hot-toast";
import Avatar from '../components/Avatar';

function Navbar() {
  const [user, setUserData] = useState({});

  const fetchUserData = () => {
    const data = getUserData();
    console.log("fetched user data", data);
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
      <div className="flex items-center gap-6 text-lg font-medium">
        <Link to="/" className="hover:text-white transition duration-300">
          Home
        </Link>
        <Link to="/login" className="hover:text-white transition duration-300">
          Login
        </Link>
      <Link to="/signup" className="hover:text-white transition duration-300">
          Signup
        </Link>
      <Link to="/dashboard" className="hover:text-white transition duration-300">
          Dashboard
        </Link>
        <Link to="/newtours" className="hover:text-white transition duration-300">
          New Tours
        </Link>
      </div>
      <div>
        {user?.name ?(
          <div className='flex items-center gap-2'>
            <Avatar name={user.name}/>
           Hello, {user.name}!
            <Button variant="danger" title="Logout" onClick={handleLogout} />
          </div>) : (
            
          <Link className="bg-orange-500 text-white
           hover:bg-orange-600 focus:ring-orange-300 px-5 py-2.5 text-base"
           to="/login">
            Login
          </Link>
        )} 
      </div>
      <Button variant="primary" title="Logout" onClick={handleLogout} />
      <Toaster />
    </div>
  );
}

export default Navbar;