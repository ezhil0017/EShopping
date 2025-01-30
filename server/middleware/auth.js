import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
  try {
    //! get the token from cookies
    const { accessToken } =
      req.cookies || req?.header?.authorization?.split(' ');
    if (!accessToken) {
      return res.status(401).json({
        message: 'Provide Token',
      });
    }
    //! validate the token
    const decodedVal = await jwt.verify(
      accessToken,
      process.env.SECRET_KEY_ACCESS_TOKEN
    );
    // const user = await UserModel.findById({ _id: decodedVal?._id });
    if (!decodedVal) {
      return res.status(500).json({
        message: 'UnAuthorized Access',
        error: true,
        success: false,
      });
    }
    req.userId = decodedVal._id;
    console.log('decodedValue: ', decodedVal);
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
