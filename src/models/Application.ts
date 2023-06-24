const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  position: { type: String, required: true },
  situation: { type: String, required: true },
  positionExperience: { type: Number, required: true },
  companyAddress: { type: String, required: true },
  apply: {
    path: { type: String },
    day: { type: String },
    link: { type: String },
  },
  personalOpinion: [Object],
});

export const Application = mongoose.model('Test', ApplicationSchema);
