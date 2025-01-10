import { Router } from 'express';
import {
  loginUserController,
  registerUserConrtoller,
  uploadAvatar,
  userLogOutController,
} from '../controllers/userController.js';

import { authUser } from '../middleware/auth.js';
import upload from '../middleware/multer.js';
const userRouter = Router();

userRouter.post('/register', registerUserConrtoller);
userRouter.post('/login', loginUserController);
userRouter.get('/logout', authUser, userLogOutController);
userRouter.put(
  '/upload-avatar',
  authUser,
  upload.single('avatar'),
  uploadAvatar
);
export default userRouter;
