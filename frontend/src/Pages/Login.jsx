import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { PiNotepadFill } from "react-icons/pi";
import { handleError, handleSuccess } from "../toastMessage.js"
import { ToastContainer } from 'react-toastify';
import { ThemeContext } from '../Context/ThemeContextProvider.jsx';

const Login = () => {
    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = loginInfo;
        if(!email || !password){
            return handleError("email and password are required");
        }

        try {
            const url = "https://notenest-api.vercel.app/auth/login";
            // const url = "http://localhost:3010/auth/login"

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            // console.log(result)
            const { message, success, error, name, jwtToken } = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem("token", jwtToken);
                localStorage.setItem("loggedInUser", name)
                setTimeout(() => {
                    navigate("/home")
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
        setTimeout(() => {
            window.location.reload();
        }, 800);
    }

    const { darkTheme } = useContext(ThemeContext);

    const handleNavigateToForgotPassword = () => {
        navigate("/forgot-password");
        window.location.reload(); 
    }

  return (
    <>
    <div className='flex items-center justify-center min-h-[76vh]'>
    <div className={`${darkTheme ? "bg-zinc-800 text-zinc-300" : "bg-zinc-300 text-zinc-800"} w-[20rem] rounded-md py-6 px-8 shadow-[0_35px_60px_-15px_rgba(20,40,40,0.8)]`}>
        <div className='flex items-center gap-2'>
            <PiNotepadFill size={40}/>
            <span className='text-xl font-medium'>Note Nest</span>
        </div>
        <h1 className='text-3xl font-medium text-center mb-5'>Login</h1>
            <form onSubmit={handleLoginSubmit}>
                <div className='flex flex-col gap-2 mt-3'>
                <label htmlFor="email">Email</label>
                <input 
                className={`${darkTheme ? "bg-zinc-700 border-zinc-400": "bg-zinc-100 border-zinc-700"} rounded-md border-[0.5px]  px-3 pt-1 pb-2 focus:outline-none`}
                type="email" 
                name="email" 
                id='email'
                placeholder='your@email.com' 
                value={loginInfo.email}
                onChange={handleChange}
                />
                </div>

                <div className='flex flex-col gap-2 mt-3'>
                <label htmlFor="password">Password</label>
                <input 
                className={`${darkTheme ? "bg-zinc-700 border-zinc-400": "bg-zinc-100 border-zinc-700"} rounded-md border-[0.5px]  px-3 pt-1 pb-2 focus:outline-none`}
                type="password" 
                name="password" 
                id='password'
                placeholder='your password' 
                value={loginInfo.password}
                onChange={handleChange}
                />
                </div>
                <p 
                onClick={handleNavigateToForgotPassword}
                className={`${darkTheme ? "text-zinc-300" : "text-zinc-800"} text-[13px] cursor-pointer hover:underline flex justify-end`}
                >Forgot Password?</p>

                <button className={`${darkTheme ? "bg-zinc-300 hover:bg-white text-zinc-900" : "bg-zinc-700 hover:bg-zinc-800 text-zinc-200"} w-[100%] my-6 rounded-md p-2 font-medium`}>Login</button>
                <p className='text-sm text-center'>Don't have an account?{" "}
                    <Link to="/signup" className='underline'>Sign up</Link>
                </p>
            </form>
    </div>
    </div>

    <ToastContainer />
    </>
  )
}

export default Login
