import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      unique: true,
      index: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      min: 0,
      required: true,
    },

    method: {
      type: String,
      enum: [
        "card",
        "upi",
        "paypal",
        "cash_on_delivery",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "success",
        "pending",
        "failed",
        "refunded",
      ],
      default: "pending",
      index: true,
    },

    currency: {
      type: String,
      default: "USD",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", schema);