import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

import { homeRouter } from './routes';
import { detailRouter } from './routes/api/DetailRouter';
import { chartRouter } from './routes/api/chartRouter';
import { loginRouter } from './routes/api/LoginRouter';
import { apiRouter } from './routes/api/api';
import signupRouter from './routes/api/SignupRouter';
import mongoose from 'mongoose';

const app = express();

app.set('PORT', process.env.PORT || 8080);

app.use(express.static('public'));
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', homeRouter);
app.use('/api', apiRouter);
app.use('/charts', chartRouter);
app.use('/details', detailRouter);
app.use('/signUp', signupRouter);
app.use('/login', loginRouter);

const MONGO_URL = process.env.MONGO_URI || '';

mongoose
  .connect(MONGO_URL, {
    autoIndex: true,
  })
  .then(() => {
    console.log('MongoDB has been connected');
  })
  .catch((err) => {
    console.error(err);
    console.log('Error!');
  });

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on PORT:${app.get('PORT')}`);
});
