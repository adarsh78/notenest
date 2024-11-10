import React, { useContext, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import RefreshHandler from './Components/RefreshHandler';
import Navbar from './Components/Navbar';
import { ThemeContext } from './Context/ThemeContextProvider';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { darkTheme } = useContext(ThemeContext);

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }


  return (
    <>
    <div className={`${darkTheme ? "bg-zinc-700" : "bg-zinc-200"} min-h-screen`}>
      <Navbar isAuthenticated={isAuthenticated}/>
      {!isAuthenticated && (
        <h1 className={`${darkTheme ? "text-zinc-300" : "text-zinc-700"} text-center text-sm md:text-xl lg:text-2xl w-[20rem] md:w-[25rem] lg:w-[30rem] mx-auto mt-[3rem]`}>Welcome to Note Nest! Secure, organize, and access your notes anytime, anywhere.</h1>
      )}
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path='/' element={<Navigate to="/login" />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/home' element={<ProtectedRoute element={<Home />}/>}/>
      <Route path='/forgot-password' element={<ForgotPassword />}/>
      <Route path='reset-password/:token' element={<ResetPassword />}/>
    </Routes>
    </div>
    </>
  )
}

export default App