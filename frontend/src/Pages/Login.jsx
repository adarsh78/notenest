import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { PiNotepadFill } from "react-icons/pi";
import { handleError, handleSuccess } from "../toastMessage.js"
import { ToastContainer } from 'react-toastify';

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
            const url = "http://localhost:3010/auth/login";

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
    }

  return (
    <>
    <div className='flex items-center justify-center min-h-screen'>
    <div className='bg-red-200 w-[20rem] rounded-md py-6 px-8'>
        <div className='flex items-center gap-2'>
            <PiNotepadFill size={40}/>
            <span className='text-xl font-medium'>NoteNest</span>
        </div>
        <h1 className='text-3xl font-medium text-center mb-5'>Login</h1>
            <form onSubmit={handleLoginSubmit}>
                <div className='flex flex-col gap-2 mt-3'>
                <label htmlFor="email">Email</label>
                <input 
                className='bg-green-200 rounded-md border-[1px] border-zinc-400 px-3 pt-1 pb-2 focus:outline-none'
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
                className='bg-green-200 rounded-md border-[1px] border-zinc-400 px-3 pt-1 pb-2 focus:outline-none'
                type="password" 
                name="password" 
                id='password'
                placeholder='your password' 
                value={loginInfo.password}
                onChange={handleChange}
                />
                </div>

                <button className='w-[100%] my-4 bg-white rounded-md p-2'>Login</button>
                <p className='text-sm text-center'>Don't have an account?
                    <Link to="/signup" className='text-blue-700 underline'>Sign up</Link>
                </p>
            </form>
    </div>
    </div>

    <ToastContainer />
    </>
  )
}

export default Login