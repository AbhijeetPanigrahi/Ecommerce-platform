const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  productId: {
    type: String,
    required: true,
  },
  title: String,
  price: Number,
  image: String,
  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("CartItem", cartItemSchema);
