import mongoose, { Schema } from "mongoose";

interface UserInstance {
  name: String;
  email: String;
  imageUrl: String;
  email_verified: String;
  role: String;
  user_id: String;
  auth_time: String;
}

const UserSchema = new Schema<UserInstance>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    email_verified: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    auth_time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model<UserInstance>("user", UserSchema);
