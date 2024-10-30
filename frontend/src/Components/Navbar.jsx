import React, { useEffect, useState } from 'react'
import { PiNotepadFill } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

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
    }


  return (
   <>
   <div className='flex gap-3 bg-zinc-500 py-3 px-6 items-center justify-between'>
    <div className='flex gap-3 items-center'>
   <PiNotepadFill size={40}/>
   <div>NoteNest</div>
    </div>
   <div className='flex items-center gap-1 justify-end flex-col'>
   <span>Hello, {loggedInUser}</span>
   <div className='flex items-center gap-3'>
   <button>Mode</button>
   <button onClick={handleLogout}>Logout</button>
   </div>
   </div>
   </div>
   </>
  )
}

export default Navbar