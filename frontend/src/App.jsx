import React, { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import RefreshHandler from './Components/RefreshHandler';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }


  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path='/' element={<Navigate to="/login" />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/home' element={<ProtectedRoute element={<Home />}/>}/>
    </Routes>
    </>
  )
}

export default App