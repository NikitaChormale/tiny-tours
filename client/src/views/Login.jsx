import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { setTitle } from "./../utils";
import Input from "./../components/Input";
import Button from "./../components/Button";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {

  const [CheskUser, setCheckUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setTitle("Login - TinyTours");
  }, []);

  const CheckLoginUsers = async () => {

    if (!CheskUser.email || !CheskUser.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        CheskUser
      );

      console.log(response.data);

      if (response.data.success) {

        toast.success(response.data.message);

        const { token, data } = response.data;

        localStorage.setItem("userjwtToken", token);
        localStorage.setItem("userData", JSON.stringify(data));

        setCheckUser({
          email: "",
          password: "",
        });

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);

      } else {
        toast.error(response.data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message || "Server error!"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">

      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-slate-800">
              Welcome Back
            </h1>

            <p className="text-slate-500 mt-2">
              Login to continue your journey
            </p>

          </div>

          <div className="space-y-4">

            <Input
              type="email"
              placeholder="Enter Email"
              value={CheskUser.email}
              onChange={(e) => {
                setCheckUser({
                  ...CheskUser,
                  email: e.target.value,
                });
              }}
            />

            <Input
              type="password"
              placeholder="Enter Password"
              value={CheskUser.password}
              onChange={(e) => {
                setCheckUser({
                  ...CheskUser,
                  password: e.target.value,
                });
              }}
            />

            <Button
              title="Login"
              onClick={CheckLoginUsers}
              className="w-full"
            />

          </div>

          <div className="mt-6 text-center">

            <p className="text-slate-600">
              Don't have an account?{" "}

              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Signup
              </Link>

            </p>

          </div>

        </div>

      </div>

      <Toaster position="top-center" reverseOrder={false} />

    </div>
  );
}

export default Login;