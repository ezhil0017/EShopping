import sendEmail from '../config/sendEmail.js';
import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import jwt from 'jsonwebtoken';
import uploadImageClodinary from '../utils/uploadImageCloudinary.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';
import generateAccessToken from '../utils/generateAccessToken.js';
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
      // const accessToken = jwt.sign({ _id: user?._id }, 'Secret@123', {
      //   expiresIn: '1d',
      // });
      const accessToken = await generateAccessToken(user._id);
      const refreshToken = await generatedRefreshToken(user._id);
      //! Adding the token to cookie and sending the response to User
      const cookiesOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      };
      res.cookie('accessToken', accessToken, cookiesOptions);
      res.cookie('refreshToken', refreshToken, cookiesOptions);
      // Get current time in IST as a Date object
      const ISTTime = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
      });

      // Convert the formatted IST time back to a Date object
      const ISTDate = new Date(ISTTime);

      // Update last login time in the database
      await UserModel.findByIdAndUpdate(user._id, {
        last_login_date: ISTDate,
      });
      //! last login time
      const updateLoginTime = await UserModel.findByIdAndUpdate(user?._id, {
        last_login_date: ISTTime,
      });
      return res.status(200).json({
        message: 'Logged In Successfully',
        error: false,
        success: true,
        data: {
          accessToken,
          refreshToken,
        },
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

//! Logout Controller
export const userLogOutController = async (req, res) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    };
    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);

    return res.json({
      message: 'Logout successfully',
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

export const uploadAvatar = async (req, res) => {
  try {
    //! auth middleware
    const userId = req.userId;
    //! multer middleware
    const image = req.file;
    const upload = await uploadImageClodinary(image);
    const updtUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });
    return res.json({
      message: 'upload profile',
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const userId = req.userId;
    const updateFields = {
      ...(name && { name: name }),
      ...(email && { email: email }),
      ...(mobile && { mobile: mobile }),
    };
    console.log(userId);
    const updtUser = await UserModel.findByIdAndUpdate(userId, updateFields, {
      returnDocument: 'after',
    });

    return res.status(200).json({
      message: 'User Updated Successfully',
      error: false,
      success: true,
      data: updtUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { email, password: newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: 'Please provide email,password,confirmPassword',
        error: true,
        success: false,
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: 'password and confirmPasword Should be Same',
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'Invalid Email',
        error: true,
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updateUser = await UserModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    return res.status(200).json({
      message: 'password changed successfully',
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//! Refresh Token Controller
export const refreshToken = async (req, res) => {
  try {
    const refreshToken =
      req?.cookies?.refreshToken || req?.header?.authorization?.split(' ')[1]; /// [Bearer token]
    if (!refreshToken) {
      return res.status(401).json({
        message: 'Invalid Token',
        error: true,
        success: false,
      });
    }
    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_ACCESS_TOKEN
    );
    const userId = verifyToken?._id;
    if (!verifyToken) {
      return res.status(401).json({
        message: 'Token is expired',
        error: true,
        success: false,
      });
    }
    const newAccessToken = await generateAccessToken(userId);
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    };
    res.cookie('accessToken', newAccessToken, cookieOptions);
    return res.json({
      message: 'New Access Token Generated',
      error: false,
      success: true,
      data: {
        newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
