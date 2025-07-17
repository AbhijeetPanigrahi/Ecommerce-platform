const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: String,
  title: String,
  price: Number,
  image: String,
  quantity: {
    type: Number,
    default: 1,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [orderItemSchema],
    totalAmount: Number,
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
