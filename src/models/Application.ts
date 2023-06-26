import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    companyName: { type: String, required: true },
    position: { type: String, required: true },
    situation: { type: String, required: true },
    positionExperience: { type: Number, required: true },
    companyAddress: { type: String },
    apply: {
      path: { type: String },
      day: { type: String },
      link: { type: String },
    },
    personalOpinion: [Object],
  },
  {
    autoIndex: true,
  },
);

export const Application = mongoose.model('Application', ApplicationSchema);
