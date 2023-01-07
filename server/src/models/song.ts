import mongoose, { Schema } from "mongoose";

export interface songInstance {
  name: String;
  imageUrl: String;
  songURL: String;
  album: String;
  artist: String;
  language: String;
  category: String;
}

const songSchema = new Schema<songInstance>(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    songURL: {
      type: String,
      required: true,
    },
    album: {
      type: String,
    },
    artist: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

export const songModel = mongoose.model<songInstance>("song", songSchema);
