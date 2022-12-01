import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import appIcon from "../appIcon.png";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  //all about mobil
  //setState is ture, start function when showing nav bar(3 lines on left top)
  const [nav, setNav] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };
  // console.log("check!!!", user?.email);
  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
      <div className="items-center justify-between">
        <Link to="/" className="flex items-center justify-between p-2">
          <img className="w-16 rounded-full" src={appIcon} alt="/" />
          <h1 className="text-2xl p-2">Bookworm</h1>
        </Link>
      </div>
      <div className="hidden md:block">
        <ThemeToggle />
      </div>

      {user?.email ? (
        <div>
          <Link to="/account" className="p-4">
            Account
          </Link>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      ) : (
        <div className="hidden md:block">
          <Link to="/signin" className="p-4 hover:text-accent">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* menu icon */}
      <div onClick={handleNav} className="block md:hidden cursor-pointer z-10">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Menu */}
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10"
            : "fixed left-[-100%] top-20 h[90%] flex flex-col items-center justify-between ease-in duration-300"
        }
      >
        <ul className="w-full p-4">
          <li onClick={handleNav} className="border-b py-6">
            <Link to="/">Home</Link>
          </li>

          {user?.email ? (
            <li onClick={handleNav} className="border-b py-6">
              <Link to="/account">Account</Link>
            </li>
          ) : (
            <li onClick={handleNav} className="border-b py-6">
              <Link to="/signin">Sign In</Link>
            </li>
          )}

          <li className="py-6">
            <ThemeToggle />
          </li>
        </ul>
        <div className="flex flex-col w-full p-4">
          <Link to="/signin">
            <button
              onClick={handleNav}
              className="w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl"
            >
              Sign In
            </button>
          </Link>
          <Link onClick={handleNav} to="/signup">
            <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
