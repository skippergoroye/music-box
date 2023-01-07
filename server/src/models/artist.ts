import mongoose, { Schema } from "mongoose";

export interface artistInstance {
  name: String;
  imageUrl: String;
  twitter: String;
  instagram: String;
}

const artistSchema = new Schema<artistInstance>(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
      required: true,
    },
    instagram: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const artistModel = mongoose.model<artistInstance>("artist", artistSchema);
