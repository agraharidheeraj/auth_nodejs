const model = require("../models");
const { sendOtpToEmail } = require("../service/emailProvider");
const { generateToken } = require("../utils/generateToken");
const { generateUUID } = require("../utils/generateUUID");
const { responde } = require("../utils/responceHandler");
const bcrypt = require("bcrypt");
const validate = require("validator");

const signup = async (req, res) => {
  try {
    const id = generateUUID();
    const { name, email, password } = req.body;
    if (!validate.isEmail(email) || !email.endsWith("@gmail.com")) {
      return responde(
        res,
        400,
        "Please enter a valid email address ending with @gmail.com"
      );
    }
    const existingUser = await model.User.findOne({ where: { email } });
    if (existingUser) {
      return responde(res, 400, "User already exists please login");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationOTP = Math.floor(
      10000 + Math.random() * 900000
    ).toString();
    user = await model.User.create({
      id,
      name,
      email,
      password: hashedPassword,
      verificationOTP,
      otpExpiresAt: Date.now() + 10 * 60 * 1000,
    });

    await sendOtpToEmail(user.email, verificationOTP);

    const token = generateToken(user);
    res.cookie("token", token, { maxAge: 3600000 });

    return responde(
      res,
      201,
      "User created successfully.Check your email for otp varification",
      {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: false,
      }
    );
  } catch (error) {
    return responde(res, 500, "Something went wrong");
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { verificationOTP } = req.body;

    const user = await model.User.findOne({ where: { verificationOTP } });
    if (!user) {
      return responde(res, 400, "Invalid OTP");
    }

    if (user.otpExpiresAt < Date.now()) {
      return responde(res, 400, "OTP expire");
    }

    user.verificationOTP = null;
    user.otpExpiresAt = null;
    user.isVerified = true;
    await user.save();

    return responde(res, 200, "Email verified successfully", {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    });
  } catch (error) {
    return responde(res, 500, "somethings went wrong");
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await model.User.findOne({ where: { email } });

    if (!user) return responde(res, 404, "User not found");

    if (!user.isVerified) return responde(res, 404, "User not verified");

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) return responde(res, 400, "password is invalid");

    const token = generateToken(user);
    res.cookie("token", token, { maxAge: 3600000 });

    return responde(res, 200, "User logged in successfully", {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    });
  } catch (error) {
    return responde(res, 500, "something went wrong");
  }
};

const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await model.User.findOne({ where: { email } });
    if (!user) {
      return responde(res, 400, "User not found");
    }

    const verificationOTP = Math.floor(
      10000 + Math.random() * 900000
    ).toString();

    user.verificationOTP = verificationOTP;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendOtpToEmail(user.email, verificationOTP);

    return responde(
      res,
      200,
      "Otp send to your email.please Check for email varification"
    );
  } catch (error) {
    console.error(error);
    return responde(res, 500, "something went wrong");
  }
};

const resetPassword = async (req, res) => {
  try {
    const { verificationOTP, newPassword } = req.body;

    const user = await model.User.findOne({ where: { verificationOTP } });
    if (!user) {
      return responde(res, 400, "Invalid OTP");
    }

    if (user.otpExpiresAt < Date.now()) {
      return responde(res, 400, "OTP expire");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.verificationOTP = null;
    user.otpExpiresAt = null;
    await user.save();
    return responde(res, 200, "Password reset succesfully");
  } catch (error) {
    console.error(error);
    return responde(res, 500, "something went wrong");
  }
};

const logout = (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0) });
    return responde(res, 200, "successfully logged out");
  } catch (error) {
    console.error(error);
    return responde(res, 500, "something went wrong");
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) return responde(res, 400, "User id is required");
   
    const user = await model.User.findOne({
      where: { id: userId },
      attributes:["id","name","email"]
    });

    if(!user) return responde(res, 404, "User not found");
    return responde(res,200,'user profile get successful',user)

  } catch (error) {
    console.error(error);
    return responde(res,500,'something went wrong')
  }
};

module.exports = {
  signup,
  verifyOtp,
  signin,
  forgotpassword,
  resetPassword,
  logout,
  getUserProfile
};
