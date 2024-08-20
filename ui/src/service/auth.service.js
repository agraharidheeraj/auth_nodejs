import { authFailure, authRequest, authSuccess, logoutSuccess, verifyOtpSuccess } from "../redux/authSlice";
import store  from "../redux/store";
import axiosInstance from "./url.service";


const dispatch = store.dispatch;


//signup user
export const signUpUser = async(userData)=>{
    dispatch(authRequest);
    try {
        const response= await axiosInstance.post('/auth/signup',userData)
        dispatch(authSuccess(response.data.data))
        return response.data;
    } catch (error) {
        dispatch(authFailure(error))
        throw error.response.data;
    }
}


//signin user
export const signInUser = async(userData)=>{
    dispatch(authRequest);
    try {
        const response= await axiosInstance.post('/auth/signin',userData)
        dispatch(authSuccess(response.data.data))
        return response.data;
    } catch (error) {
        dispatch(authFailure(error))
        throw error.response.data;
    }
}


//otp verify user
export const otpVerify = async(optData)=>{
    dispatch(authRequest);
    try {
        const response= await axiosInstance.post('/auth/verify-otp',optData)
        dispatch(verifyOtpSuccess())
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}


//user forgot password
export const forgotPassword = async(email)=>{
    try {
        const response= await axiosInstance.post('/auth/forgot-password',email)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

//user reset password
export const resetPassword = async(resetData)=>{
    try {
        const response= await axiosInstance.post('/auth/reset-password',resetData)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

//user logout
export const logout = async()=>{
    try {
        const response= await axiosInstance.get('/auth/logout')
        if(response.status=== 200){
            dispatch(logoutSuccess())
        }
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}