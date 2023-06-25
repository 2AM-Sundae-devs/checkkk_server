"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApplicationSchema = new mongoose_1.default.Schema({
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
exports.Application = mongoose_1.default.model('Application', ApplicationSchema);
