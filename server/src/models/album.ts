import mongoose, { Schema } from "mongoose";

export interface albumInstance {
  name: String;
  imageUrl: String;
}

const albumSchema = new Schema<albumInstance>(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const albumModel = mongoose.model<albumInstance>("album", albumSchema);





