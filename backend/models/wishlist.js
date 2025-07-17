const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  title: String,
  price: Number,
  image: String,
});

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [productSchema], // <-- THIS IS THE FIXED PART
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
