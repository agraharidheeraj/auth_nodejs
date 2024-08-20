
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({element}) =>{
    const {isAuthenticated} = useSelector(state => state.auth)

    return isAuthenticated ? element : <Navigate to='/login' />
}
