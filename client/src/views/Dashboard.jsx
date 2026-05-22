import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { getUserjwtToken } from "../utils";
import TourCard from "../components/TourCard";

import {
  Plus,
  Plane,
  MapPinned,
  CalendarDays,
} from "lucide-react";

function Dashboard() {

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTours = async () => {

    try {

      const userJwt = getUserjwtToken();

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/tours`,
        {
          headers: {
            Authorization: `Bearer ${userJwt}`,
          },
        }
      );

      if (response.data.success) {
        setTours(response.data.data);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {

      console.log(error);
      toast.error("Failed to load tours");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Hero Section */}
        <div
          className="
            bg-gradient-to-r
            from-orange-500
            to-orange-400
            rounded-3xl
            p-8
            shadow-xl
            text-white
            relative
            overflow-hidden
          "
        >

          <div className="relative z-10">

            <p className="text-sm opacity-90">
              TinyTours Dashboard
            </p>

            <h1 className="text-4xl font-bold mt-2">
              Welcome Back 👋
            </h1>

            <p className="mt-3 max-w-xl text-orange-100">
              Manage your tours, explore destinations,
              and create unforgettable travel experiences.
            </p>

            <Link to="/newtours">

              <button
                className="
                  mt-6
                  flex
                  items-center
                  gap-2
                  bg-white
                  text-orange-500
                  font-semibold
                  px-6
                  py-3
                  rounded-xl
                  hover:scale-105
                  transition-all
                  duration-200
                  shadow-lg
                "
              >
                <Plus size={20} />
                Add New Tour
              </button>

            </Link>

          </div>

          {/* Decorative Circle */}
          <div
            className="
              absolute
              -top-20
              -right-20
              h-72
              w-72
              bg-white/10
              rounded-full
            "
          />

        </div>

        {/* Stats Cards */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            mt-8
          "
        >

          {/* Card 1 */}
          <div
            className="
              bg-white
              rounded-2xl
              p-6
              shadow-md
              flex
              items-center
              justify-between
            "
          >

            <div>
              <p className="text-slate-500 text-sm">
                Total Tours
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {tours.length}
              </h2>
            </div>

            <div
              className="
                bg-orange-100
                p-4
                rounded-xl
              "
            >
              <Plane className="text-orange-500" />
            </div>

          </div>

          {/* Card 2 */}
          <div
            className="
              bg-white
              rounded-2xl
              p-6
              shadow-md
              flex
              items-center
              justify-between
            "
          >

            <div>
              <p className="text-slate-500 text-sm">
                Destinations
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {tours.length * 2}
              </h2>
            </div>

            <div
              className="
                bg-blue-100
                p-4
                rounded-xl
              "
            >
              <MapPinned className="text-blue-500" />
            </div>

          </div>

          {/* Card 3 */}
          <div
            className="
              bg-white
              rounded-2xl
              p-6
              shadow-md
              flex
              items-center
              justify-between
            "
          >

            <div>
              <p className="text-slate-500 text-sm">
                Upcoming Trips
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {tours.length}
              </h2>
            </div>

            <div
              className="
                bg-green-100
                p-4
                rounded-xl
              "
            >
              <CalendarDays className="text-green-500" />
            </div>

          </div>

        </div>

        {/* Tours Section */}
        <div className="mt-10">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold text-slate-800">
              Your Tours
            </h2>

            <p className="text-slate-500">
              {tours.length} Tours Available
            </p>

          </div>

          {/* Loading */}
          {loading && (
            <div
              className="
                text-center
                py-20
                text-slate-500
                text-lg
              "
            >
              Loading tours...
            </div>
          )}

          {/* Empty State */}
          {!loading && tours.length === 0 && (

            <div
              className="
                bg-white
                rounded-2xl
                shadow-md
                p-12
                text-center
              "
            >

              <h2 className="text-2xl font-bold text-slate-700">
                No Tours Found
              </h2>

              <p className="text-slate-500 mt-2">
                Create your first amazing tour 🚀
              </p>

              <Link to="/newtours">

                <button
                  className="
                    mt-6
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    transition
                  "
                >
                  Create Tour
                </button>

              </Link>

            </div>

          )}

          {/* Tours Grid */}
          {!loading && tours.length > 0 && (

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >

              {tours.map((tourItem, index) => {

                return (
                  <TourCard
                    key={index}
                    {...tourItem}
                  />
                );

              })}

            </div>

          )}

        </div>

      </div>

      <Toaster position="top-center" />

    </div>
  );
}

export default Dashboard;