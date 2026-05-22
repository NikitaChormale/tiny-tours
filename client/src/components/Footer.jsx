import React from "react";
import { Link } from "react-router";


export default function Footer() {
  return (
    <footer className="bg-yellow-200 text-gray-700 border-t
     shadow-inner border-none">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 
      md:grid-cols-4 gap-10 text-center md:text-left">

        <div>
          <h2 className="text-3xl font-extrabold text-yellow-600 tracking-wide">
            Fruitora Fruits
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Fruitora brings you farm-fresh fruits and vegetables with quality, 
            freshness, and fast delivery at your doorstep.
  

          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-yellow-500 transition">Home</Link></li>
            <li><Link to="/home" className="hover:text-yellow-500 transition">Product</Link></li>
            <li><Link to="/dashboard" className="hover:text-yellow-500 transition">Contact</Link></li>
          </ul>
        </div>
        </div>

      
    </footer>
  );
}
