import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/LoginSection/Login";
import VerifyOtp from "./components/LoginSection/Verify-Otp";
import Forgotpassword from "./components/LoginSection/Forgot-password";
import ResetPassword from "./components/LoginSection/Reset-Password";
import Home from "./components/HomePage/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import SuccessLogin from "./SuccessLogin";
import Navbar from "./components/HomePage/Navbar";
import CreateTodo from "./components/TodoSection/CreateTodo";
import Todos from "./components/TodoSection/Todos";
import { isTokenPresent } from "./redux/authToken";
import { logoutSuccess } from "./redux/authSlice";


const AppContent = () =>{
   const location = useLocation();
   const {isAuthenticated} = useSelector(state => state.auth)
   const noNavbarPaths = ["/login","/verify-otp","/forgot-password","/reset-password","/success-login"]

   const dispatch = useDispatch()
   useEffect(() =>{
      if(!isTokenPresent()){
        dispatch(logoutSuccess())
      }
   },[dispatch])

   return (
      <>
            {!noNavbarPaths.includes(location.pathname) && <Navbar/>} 
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to='/' /> : <Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/success-login" element={<SuccessLogin />} />
          <Route path="/" element={<Home/>}/>
          <Route path="/create-todos" element={<ProtectedRoute><CreateTodo /></ProtectedRoute>} />
          <Route path="/todos-list" element={<ProtectedRoute><Todos /></ProtectedRoute>} />
        </Routes>
      </>
   )
}

function App() {

  return (
    <div className="App">
      <ToastContainer position="top-center"/>
      <BrowserRouter>
        <AppContent/>
      </BrowserRouter>
    </div>
  );
}

export default App;
