import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import toast, { Toaster } from "react-hot-toast"
import { getUserjwtToken } from '../utils';
import imgNewTour from "./../assets/new-tour-png.png";
import TourCard from '../components/TourCard';



function Dashboard() {
  const [tours, setTours] = useState([]);

  const loadTours = async () => {
    const userJwt = getUserjwtToken();

    const response = await axios.get("http://localhost:8080/tours", {
      headers: {
        Authorization: `Bearer ${userJwt}`,
      },
    });
    if (response.data.success) {
      setTours(response.data.data);
      toast.success(response.data.message)
    }
    else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='w-2/3 block mx-auto mt-10 ' >

        <Link to="/newtours">
          <img src={imgNewTour}
            alt='new tour'
            className='fixed bottom-10 right-10 h-10
      cursor-pointer'
          />
        </Link>



        {
          tours.map((tourItem, index) => {
            return (
              <TourCard
                key={index}
                {...tourItem}
              />
            );
          })
        }
      </div>
      <Toaster />
    </div>
  )
}

export default Dashboard
