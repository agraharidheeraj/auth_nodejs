import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/LoginSection/Login";
import VerifyOtp from "./components/LoginSection/Verify-Otp";
import Forgotpassword from "./components/LoginSection/Forgot-password";
import ResetPassword from "./components/LoginSection/Reset-Password";
import Home from "./components/HomePage/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./utils/ProtectedRoute";

function App() {
  const {isAuthenticated} = useSelector(state => state.auth)
  return (
    <div className="App">
      <ToastContainer position="top-center"/>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to='/' /> : <Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
