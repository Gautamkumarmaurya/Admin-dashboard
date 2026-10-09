import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    phone: {
      type: String,
      trim: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: [
        "admin",
        "manager",
        "staff",
        "customer",
      ],
      default: "customer",
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compare password
schema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Remove password from JSON response
schema.set("toJSON", {
  transform: (_, ret) => {
    delete ret.password;
    return ret;
  },
});

export default mongoose.model("User", schema);