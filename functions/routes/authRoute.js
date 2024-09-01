const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/auth/signup', authController.signup)
router.post('/auth/verify-otp', authController.verifyOtp)
router.post('/auth/signin', authController.signin)
router.post('/auth/forgot-password', authController.forgotpassword)
router.post('/auth/reset-password', authController.resetPassword)

router.get('/auth/logout', authController.logout)



//auth request
router.get('/user/profile',authMiddleware, authController.getUserProfile)

module.exports= router;