import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

import { homeRouter } from './routes';
import { detailRouter } from './routes/api/DetailRouter';
import chartRouter from './routes/api/chartRouter';
import { loginRouter } from './routes/api/LoginRouter';
import signupRouter from './routes/api/SignupRouter';
import applicationsRouter from './routes/api/applicationsRouter';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://checkkk.com',
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('PORT', process.env.PORT || 8080);

app.use('/', homeRouter);
app.use('/charts', chartRouter);
app.use('/applications', applicationsRouter);
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
