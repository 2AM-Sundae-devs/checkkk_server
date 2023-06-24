import mongoose from 'mongoose';

require('dotenv').config();

const MONGO_URL = process.env;

mongoose
  .connect(process.env.MONGO_URI || '', {
    autoIndex: true,
  })
  .then(() => {
    console.log('MongoDB has been connected');
  })
  .catch((err) => {
    console.error(err);
    console.log('Error!');
  });
