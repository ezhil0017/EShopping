import { Router } from 'express';
import { registerUserConrtoller } from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/register', registerUserConrtoller);

export default userRouter;
