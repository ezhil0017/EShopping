import express from 'express';

import { connectDb } from './config/database.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import userRouter from './routes/userRouter.js';

const app = express();
//! allows you to control which websites can access your server's resources
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
//! its used to convert the json to javascript object in request.body
app.use(express.json());
//! its used to convert the cookie to readable
app.use(cookieParser());
//! to track application performance, troubleshoot issues, and monitor traffic
app.use(morgan());
//! helps secure HTTP headers in Express apps
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const PORT = 3000 || process.env.PORT;

app.use('/api/user', userRouter);

connectDb()
  .then(() => {
    console.log('Database connected Successfully');
    app.listen(PORT, () => {
      console.log(`Server is Successfully Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database cannot be connected');
  });
