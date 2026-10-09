import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
    },

    brand: {
      type: String,
      default: "",
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    finalPrice: {
      type: Number,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },

    images: [String],

    thumbnail: {
      type: String,
      default: "",
    },

    thumbnailPublicId: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "active",
        "inactive",
        "out_of_stock",
        "draft",
      ],
      default: "active",
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Calculate final price and update stock status
schema.pre("validate", function (next) {
  this.finalPrice = Math.max(
    0,
    this.price - (this.price * this.discount) / 100
  );

  if (this.stock === 0 && this.status === "active") {
    this.status = "out_of_stock";
  }

  next();
});

export default mongoose.model("Product", schema);