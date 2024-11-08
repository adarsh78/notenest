import React, { useContext, useEffect, useState } from "react";
import { PiNotepadFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../toastMessage.js";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { ThemeContext } from "../Context/ThemeContextProvider.jsx";
import { ToastContainer } from "react-toastify";
import { IoIosSearch } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { TodoContext } from "../Context/TodoContextProvider.jsx";

const Navbar = ({ isAuthenticated }) => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCrossOpen, setIsCrossOpen] = useState(false);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    handleSuccess("User logged out successfully");
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const { handleDarkMode, handleLightMode, darkTheme } =
    useContext(ThemeContext);

  const { searchQuery, setSearchQuery } = useContext(TodoContext);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setIsCrossOpen(true);
  };

  const handleCrossButton = () => {
    setSearchQuery("");
    setIsCrossOpen(false);
  };

  return (
    <>
      <div className="flex bg-zinc-500 py-3 px-6 items-center justify-between">
        <div className="flex gap-3 items-center">
          <PiNotepadFill size={40} />
          <div>Note Nest</div>
        </div>
        <div className="flex">
          {!isSearchOpen && (
            <IoIosSearch
              className="mr-[4rem] cursor-pointer block md:hidden lg:hidden"
              size={25}
              onClick={() => setIsSearchOpen(true)}
            />
          )}
          {isSearchOpen && (
            <div className="flex relative">
              <FaArrowLeft
                onClick={() => setIsSearchOpen(false)}
                size={17}
                className="cursor-pointer text-zinc-200 absolute right-[11.1rem] bottom-[0.8rem] z-10 border-[1px] border-zinc-200 rounded-full p-[2px]"
              />
              <div className="bg-zinc-900 p-3 rounded-xl absolute -left-[12rem] -top-6 w-[13rem] md:w-[20rem]">
                <input
                  className="bg-transparent text-zinc-200 focus:outline-none"
                  type="text"
                  placeholder="Search by title"
                  value={searchQuery}
                  onChange={handleChange}
                />
              </div>
              {isCrossOpen && (
                <RxCross2
                  size={20}
                  className="text-zinc-200 absolute -right-2 -top-[10px] cursor-pointer"
                  onClick={handleCrossButton}
                />
              )}
            </div>
          )}
        </div>

        <div className="bg-zinc-900 mx-auto hidden md:block lg:block p-3 rounded-xl mr-10">
          <input
            className="focus:outline-none bg-transparent text-zinc-200"
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={handleChange}
          />
          {isCrossOpen && (
            <RxCross2
              size={20}
              className="text-zinc-200 absolute right-[9.2rem] top-[1.650rem] cursor-pointer"
              onClick={handleCrossButton}
            />
          )}
        </div>
        <div className="flex items-center gap-1 justify-end flex-col">
          {isAuthenticated && <span>Hello, {loggedInUser}</span>}

          <div className="flex items-center gap-3">
            {darkTheme ? (
              <button onClick={handleLightMode}>
                <MdLightMode size={20} />
              </button>
            ) : (
              <button onClick={handleDarkMode}>
                <MdDarkMode size={20} />
              </button>
            )}
            {isAuthenticated && (
              <button onClick={handleLogout}>
                <MdLogout />
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
