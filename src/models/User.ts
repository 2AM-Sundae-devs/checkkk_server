import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { autoIndex: true, timestamps: true },
);

export const User = mongoose.model('User', UserSchema);
