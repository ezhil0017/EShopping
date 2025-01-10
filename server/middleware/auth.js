import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
  try {
    //! get the token from cookies
    const { token } = req.cookies || req?.header?.authorization?.split(' ');
    if (!token) {
      return res.status(401).json({
        message: 'Provide Token',
      });
    }
    //! validate the token
    const decodedVal = await jwt.verify(token, 'Secret@123');
    const user = await UserModel.findById({ _id: decodedVal?._id });
    if (!user) {
      return res.status(500).json({
        message: 'UnAuthorized Access',
        error: true,
        success: false,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
