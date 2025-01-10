import sendEmail from '../config/sendEmail.js';
import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';

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
