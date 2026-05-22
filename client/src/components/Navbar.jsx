import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  PlusCircle,
  LogIn,
  UserPlus,
} from "lucide-react";

import { getUserData, logoutUser } from "./../utils";
import Button from "./Button";
import Avatar from "./Avatar";
import { Toaster } from "react-hot-toast";

function Navbar() {
  const [user, setUserData] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchUserData = () => {
    const data = getUserData();
    setUserData(data?.user || data);
  };

  const handleLogout = () => {
    logoutUser();
    setUserData({});
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 text-white p-2 rounded-xl">
              🌍
            </div>

            <h1 className="text-2xl font-bold text-slate-800">
              TinyTours
            </h1>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-700">

          <Link
            to="/"
            className="hover:text-orange-500 transition flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-orange-500 transition flex items-center gap-1"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          <Link
            to="/newtours"
            className="hover:text-orange-500 transition flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            New Tour
          </Link>

          {!user?.name && (
            <>
              <Link
                to="/login"
                className="hover:text-orange-500 transition flex items-center gap-1"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>

              <Link
                to="/signup"
                className="hover:text-orange-500 transition flex items-center gap-1"
              >
                <UserPlus className="h-4 w-4" />
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">

          {user?.name ? (
            <>
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-full">

                <Avatar name={user.name} />

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {user.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    Welcome Back
                  </p>
                </div>
              </div>

              <Button
                variant="danger"
                title="Logout"
                onClick={handleLogout}
              />
            </>
          ) : (
            <Link
              to="/login"
              className="
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-5
                py-2
                rounded-xl
                transition
                font-medium
              "
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="h-7 w-7 text-slate-700" />
          ) : (
            <Menu className="h-7 w-7 text-slate-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="
            md:hidden
            bg-white
            border-t
            px-5
            py-5
            flex
            flex-col
            gap-5
            shadow-lg
          "
        >

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-orange-500 transition"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="hover:text-orange-500 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/newtours"
            onClick={() => setMenuOpen(false)}
            className="hover:text-orange-500 transition"
          >
            New Tour
          </Link>

          {!user?.name && (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="hover:text-orange-500 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="hover:text-orange-500 transition"
              >
                Signup
              </Link>
            </>
          )}

          {user?.name && (
            <Button
              variant="danger"
              title="Logout"
              onClick={handleLogout}
            />
          )}
        </div>
      )}

      <Toaster />
    </nav>
  );
}

export default Navbar;