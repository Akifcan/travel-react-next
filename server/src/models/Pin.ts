import { Schema, model } from "mongoose";

export interface IPin {
  username: string;
  title: string;
  desc: string;
  ratio: number;
  lat: number;
  long: number;
  mapUrl?: string;
}

const schema = new Schema<IPin>({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  ratio: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<IPin>("Pin", schema);
