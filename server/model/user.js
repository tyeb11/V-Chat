import mongoose, { mongo, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validator(value) {
        if (value.includes("password")) {
          throw new Error("password is too weak");
        }
      },
    },
    id: {
      type: Number,
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

export const User = mongoose.model("User", userSchema);
