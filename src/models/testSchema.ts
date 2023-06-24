import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  color: String,
  size: String,
  saveType: {
    type: Date,
    default: Date.now,
  },
});

export const Test = mongoose.model('Test', testSchema);
