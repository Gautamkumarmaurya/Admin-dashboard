import mongoose from "mongoose";

// Order item schema
const itemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: String,

    quantity: {
      type: Number,
      min: 1,
      required: true,
    },

    price: {
      type: Number,
      min: 0,
      required: true,
    },

    image: String,
  },
  {
    _id: false,
  }
);

// Address schema
const addressSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
  },
  {
    _id: false,
  }
);

// Order schema
const schema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      index: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    items: {
      type: [itemSchema],
      validate: (v) => v.length > 0,
    },

    shippingAddress: addressSchema,

    billingAddress: addressSchema,

    subtotal: {
      type: Number,
      min: 0,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    shippingFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    tax: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      min: 0,
      required: true,
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },

    notes: String,

    timeline: [
      {
        status: String,
        note: String,
        at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Generate order number before validation
schema.pre("validate", function (next) {
  if (!this.orderNumber) {
    this.orderNumber = `ORD-${Date.now()}-${Math.floor(
      Math.random() * 900 + 100
    )}`;
  }

  next();
});

export default mongoose.model("Order", schema);