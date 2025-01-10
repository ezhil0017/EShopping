import { Router } from 'express';
import {
  loginUserController,
  registerUserConrtoller,
  userLogOutController,
} from '../controllers/userController.js';

import { authUser } from '../middleware/auth.js';
const userRouter = Router();

userRouter.post('/register', registerUserConrtoller);
userRouter.post('/login', loginUserController);
userRouter.post('/logout', authUser, userLogOutController);
export default userRouter;
