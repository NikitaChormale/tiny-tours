import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { setTitle } from "./../utils";
import Input from "./../components/Input";
import Button from "./../components/Button";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Signup() {
  const [newUser, setNewUser] = useState({
    name: "",
    country: "",
    mobile: "",
    city: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setTitle("Signup - TinyTours");
  }, []);

  const createUsers = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/signup`,
        newUser
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create Account
          </h1>

          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
            />

            <Input
              type="text"
              placeholder="Mobile"
              value={newUser.mobile}
              onChange={(e) =>
                setNewUser({ ...newUser, mobile: e.target.value })
              }
            />

            <Input
              type="text"
              placeholder="City"
              value={newUser.city}
              onChange={(e) =>
                setNewUser({ ...newUser, city: e.target.value })
              }
            />

            <Input
              type="text"
              placeholder="Country"
              value={newUser.country}
              onChange={(e) =>
                setNewUser({ ...newUser, country: e.target.value })
              }
            />

            <Input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />

            <Input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />

            <Button
              title="Sign Up"
              onClick={createUsers}
              className="w-full mt-2"
            />
          </div>

          <p className="text-sm text-center mt-5 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}

export default Signup;