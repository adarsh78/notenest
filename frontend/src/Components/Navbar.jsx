import React, { useContext, useEffect, useState } from 'react'
import { PiNotepadFill } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from "../toastMessage.js";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { ThemeContext } from '../Context/ThemeContextProvider.jsx';

const Navbar = ({ isAuthenticated }) => {

    const [loggedInUser, setLoggedInUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUser"))
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        setTimeout(() => {
            navigate("/login");
        }, 1000);
        handleSuccess("User logged out successfully");
        window.location.reload();
    }

    const { handleDarkMode, handleLightMode, darkTheme } = useContext(ThemeContext);


  return (
   <>
   <div className='flex gap-3 bg-zinc-500 py-3 px-6 items-center justify-between'>
    <div className='flex gap-3 items-center'>
   <PiNotepadFill size={40}/>
   <div>Note Nest</div>
    </div>
   <div className='flex items-center gap-1 justify-end flex-col'>
    {isAuthenticated && (
        <span>Hello, {loggedInUser}</span>
    )}
   
   <div className='flex items-center gap-3'>
    {darkTheme ? (
        <button onClick={handleLightMode}><MdLightMode size={20}/></button>
    ) : (
        <button onClick={handleDarkMode}><MdDarkMode size={20}/></button>
    )}
    {
        isAuthenticated && (
            <button onClick={handleLogout}><MdLogout /></button>
        )
    }
   
   </div>
   </div>
   </div>
   </>
  )
}

export default Navbar