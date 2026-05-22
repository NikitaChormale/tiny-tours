import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { setTitle } from "../utils";
import Navbar from "../components/Navbar";


function Home() {

  useEffect(() => {
    setTitle("Home - TinyTours");
  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50">

      <Navbar />

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20 flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* LEFT CONTENT */}
        <div className="max-w-2xl">

          <p className="text-pink-600 font-semibold tracking-[3px] uppercase mb-4">
            Smart Travel Platform
          </p>

          <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Plan Your Next Journey With
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              {" "}TinyTours
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Create, manage, and explore travel experiences
            with a modern and colorful tour management
            platform designed for travelers and adventure lovers.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/newtours"
              className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg transition duration-300"
            >
              Add Tour
            </Link>

            <Link
              to="/dashboard"
              className="border-2 border-pink-400 text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-2xl font-semibold transition duration-300"
            >
              Dashboard
            </Link>

          </div>

          {/* STATS */}
          <div className="mt-14 flex flex-wrap gap-6">

            <div className="bg-white px-6 py-5 rounded-3xl shadow-lg border border-orange-100">

              <h2 className="text-3xl font-bold text-orange-500">
                10K+
              </h2>

              <p className="text-gray-500 mt-1">
                Happy Travelers
              </p>

            </div>

            <div className="bg-white px-6 py-5 rounded-3xl shadow-lg border border-pink-100">

              <h2 className="text-3xl font-bold text-pink-500">
                500+
              </h2>

              <p className="text-gray-500 mt-1">
                Tours Created
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">

          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            alt="travel"
            className="w-[550px] h-[650px] object-cover rounded-[40px] shadow-2xl border-8 border-white"
          />

          {/* FLOATING CARD */}
          <div className="absolute -bottom-6 -left-6 bg-white px-6 py-5 rounded-3xl shadow-2xl border border-orange-100">

            <p className="text-sm text-gray-500">
              Trusted by Travelers
            </p>

            <h3 className="text-3xl font-bold text-pink-500 mt-1">
              10K+
            </h3>

          </div>

        </div>

      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20">

        <div className="text-center mb-16">

          <p className="text-pink-600 font-semibold uppercase tracking-[4px]">
            Features
          </p>

          <h2 className="text-4xl font-bold text-gray-800 mt-4">
            Everything You Need For Travel Management
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* CARD 1 */}
          <div className="bg-white p-8 rounded-[32px] shadow-lg hover:shadow-2xl transition duration-300 border border-orange-100">

            <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl">
              🌍
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mt-6">
              Explore Destinations
            </h3>

            <p className="text-gray-600 mt-4 leading-relaxed">
              Discover beautiful destinations and organize
              your travel plans professionally.
            </p>

          </div>

          {/* CARD 2 */}
          <div className="bg-white p-8 rounded-[32px] shadow-lg hover:shadow-2xl transition duration-300 border border-pink-100">

            <div className="bg-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl">
              📸
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mt-6">
              Upload Memories
            </h3>

            <p className="text-gray-600 mt-4 leading-relaxed">
              Save travel memories with photos and
              organize experiences beautifully.
            </p>

          </div>

          {/* CARD 3 */}
          <div className="bg-white p-8 rounded-[32px] shadow-lg hover:shadow-2xl transition duration-300 border border-yellow-100">

            <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl">
              ✈️
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mt-6">
              Easy Tour Management
            </h3>

            <p className="text-gray-600 mt-4 leading-relaxed">
              Create, update, and manage all your tours
              from one smart dashboard.
            </p>

          </div>

        </div>

      </div>

      {/* CTA SECTION */}
      <div className="py-24 mt-10 bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-300">

        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-5xl font-bold text-white">
            Start Exploring With TinyTours
          </h2>

          <p className="text-white/90 mt-6 text-lg">
            Make your travel planning easier, smarter,
            and more organized with one platform.
          </p>

          <Link
            to="/newtours"
            className="inline-block mt-10 bg-white text-pink-600 px-10 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition duration-300"
          >
            Create New Tour
          </Link>

        </div>

      </div>

      {/* FOOTER */}
     
      
    </div>

  );
}

export default Home;