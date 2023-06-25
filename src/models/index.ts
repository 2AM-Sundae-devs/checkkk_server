import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

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
