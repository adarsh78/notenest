import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { PiNotepadFill } from "react-icons/pi";
import { handleError, handleSuccess } from "../toastMessage.js"
import { ToastContainer } from 'react-toastify';
import { ThemeContext } from '../Context/ThemeContextProvider.jsx';

const SignUp = () => {

    const navigate = useNavigate();

    const [signUpInfo, setSignUpInfo] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignUpInfo = {...signUpInfo};
        copySignUpInfo[name] = value;
        setSignUpInfo(copySignUpInfo);
    }

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password } = signUpInfo;
        if(!name || !email || !password){
            return handleError("name, email and password are required");
        }

        try {
            const url = "https://notenest-lrdk9tc0k-adarsh78s-projects.vercel.app/auth/signup";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signUpInfo)
            });

            const result = await response.json();
            const { message, success, error } = result;
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/login")
                }, 1000)
            }
            else if(error){
                const errorMsg = error?.details[0].message
                handleError(errorMsg)
            }
            else if(!success){
                handleError(message);
            }

        } catch (error) {
            handleError(error)
        }
    }

    const { darkTheme } = useContext(ThemeContext);



  return (
    <>
    <div className='flex items-center justify-center min-h-[74vh]'>
    <div className={`${darkTheme ? "bg-zinc-800 text-zinc-300" : "bg-zinc-300 text-zinc-800"} w-[20rem] rounded-md py-6 px-8 shadow-[0_35px_60px_-15px_rgba(20,40,40,0.8)]`}>
        <div className='flex items-center gap-2'>
            <PiNotepadFill size={40}/>
            <span className='text-xl font-medium'>Note Nest</span>
        </div>
        <h1 className='text-3xl font-medium text-center mb-5'>Sign up</h1>
            <form onSubmit={handleSignUpSubmit}>
                <div className='flex flex-col gap-2'>
                <label htmlFor="name">Full Name</label>
                <input 
                className={`${darkTheme ? "bg-zinc-700 border-zinc-400": "bg-zinc-100 border-zinc-700"} rounded-md border-[0.5px] px-3 pt-1 pb-2 focus:outline-none`}
                type="text" 
                name="name" 
                id='name'
                placeholder='John Snow' 
                value={signUpInfo.name}
                onChange={handleChange}
                />
                </div>

                <div className='flex flex-col gap-2 mt-3'>
                <label htmlFor="email">Email</label>
                <input 
                className={`${darkTheme ? "bg-zinc-700 border-zinc-400": "bg-zinc-100 border-zinc-700"} rounded-md border-[0.5px] px-3 pt-1 pb-2 focus:outline-none`}
                type="email" 
                name="email" 
                id='email'
                placeholder='your@email.com' 
                value={signUpInfo.email}
                onChange={handleChange}
                />
                </div>

                <div className='flex flex-col gap-2 mt-3'>
                <label htmlFor="password">Password</label>
                <input 
                className={`${darkTheme ? "bg-zinc-700 border-zinc-400": "bg-zinc-100 border-zinc-700"} rounded-md border-[0.5px] px-3 pt-1 pb-2 focus:outline-none`}
                type="password" 
                name="password" 
                id='password'
                placeholder='your password' 
                value={signUpInfo.password}
                onChange={handleChange}
                />
                </div>

                <button className={`${darkTheme ? "bg-zinc-300 hover:bg-white text-zinc-900" : "bg-zinc-700 hover:bg-zinc-800 text-zinc-200"} w-[100%] my-6 rounded-md p-2 font-medium`}>Sign up</button>
                <p className='text-sm text-center'>Already have an account?{" "}
                    <Link to="/login" className='underline'>Login</Link>
                </p>
            </form>
    </div>
    </div>

    <ToastContainer />
    </>
  )
}

export default SignUp
