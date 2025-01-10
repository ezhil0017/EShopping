import sendEmail from '../config/sendEmail.js';
import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import jwt from 'jsonwebtoken';

export const registerUserConrtoller = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'provide name or email or password',
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({
        message: 'Already User Exists',
        error: true,
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new UserModel(payload);
    const saveDtls = await newUser.save();
    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${saveDtls?._id}`;

    const verificationEmail = await sendEmail({
      sendTo: email,
      subject: 'Verification Email',
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    return res.json({
      message: 'User Register Successfully',
      error: false,
      success: true,
      data: saveDtls,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        message: 'Enter email or Password',
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(500).json({
        message: 'User not Register',
        error: true,
        success: false,
      });
    }
    if (user?.status !== 'Active') {
      return res.status(500).json({
        message: 'Contact Admin',
        error: true,
        success: false,
      });
    }
    //! Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (isPasswordValid) {
      //! Create a JWT token for the user
      //! its creating jwt token --> 1st parameter is data and 2nd is Secret Key it can be anything
      const token = jwt.sign({ _id: user?._id }, 'Secret@123', {
        expiresIn: '1h',
      });
      //! Adding the token to cookie and sending the response to User
      const cookiesOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      };
      res.cookie('token', token, cookiesOptions);
      return res.status(200).json({
        message: 'Logged In Successfully',
        error: false,
        success: true,
        data: user,
      });
    } else {
      return res.status(500).json({
        message: 'Invalid Credentials',
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const userLogOutController = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    res.cookie('token', null, { expires: new Date(Date.now()) });
    return res.status(200).json({
      message: 'Logged Out Successfully',
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
