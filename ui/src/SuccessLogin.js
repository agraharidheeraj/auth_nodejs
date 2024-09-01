import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from './service/auth.service';

const SuccessLogin = () => {
  const dispatch= useDispatch();
  const navigate= useNavigate();
  useEffect(() =>{
       const authenticateUser = async() =>{
         try {
             await fetchUserProfile();
             navigate('/')
         } catch (error) {
             console.error('google auth failed',error)
         }
       }
       authenticateUser();
  },[dispatch,navigate])
  return (
    <div>
      Loading ...
    </div>
  )
}

export default SuccessLogin