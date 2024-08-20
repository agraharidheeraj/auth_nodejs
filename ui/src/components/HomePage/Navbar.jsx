import React, { useState } from "react";
import { useSelector } from "react-redux";
import { logout } from "../../service/auth.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };


  const handleSignOut = async () => {
      try {
          const result = await logout()
          if(result.status === 'success') {
           toast.success(result.message)
          }
      } catch (error) {
         console.error(error)
         toast.error('Failed to log out. Please try again later')
      }
  }

  const handleLoginPage = ()=>{
    navigate('/login')
  }

  return (
    <div className="bg-gray-500 shadow-xl">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-gray-800">
            <h2>Todos</h2>
          </div>
        </div>
        <div className="flex lg:space-x-6">
          {isAuthenticated ? (
            <div className="relative">
              <button
                className="flex items-center text-gray-800 focus:outline-none"
                onClick={toggleDropDown}
              >
                <img
                  src={
                    user?.profileImage ||
                    "https://img.freepik.com/free-vector/businessman-working-laptop-computer-office-3d-character-isolated-white-background_40876-3756.jpg?size=626&ext=jpg&ga=GA1.1.1785322808.1723815368&semt=ais_hybrid"
                  }
                  alt="user_img"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="ml-2">{user?.name}</span>
              </button>
              {dropDownOpen && (
                <div className="absolute right-0 left-4 mt-2 w-48 h-24 bg-white shadow-lg border border-gray-300 rounded">
                  <button className="block px-2 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">
                    Profile
                  </button>
                  <button className="block px-2 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={handleSignOut}>
                    SignOut
                  </button>
                </div>
              )}
            </div>
          ):(
            <button
           onClick={handleLoginPage}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
             Sign In
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
