const Wishlist = require("../models/wishlist");

exports.addToWishlist = async (req, res) => {
  const { productId, title, price, image } = req.body;
  const userId = req.user.userId;

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
    }

    const alreadyExists = wishlist.products.find(
      (p) => p.productId === productId
    );
    if (alreadyExists) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    wishlist.products.push({ productId, title, price, image });
    await wishlist.save();

    res.json({ message: "Added to wishlist", wishlist });
  } catch (err) {
    console.error("Wishlist Add Error:", err); // ADD THIS
    res.status(500).json({ message: "Server error" });
  }
};

exports.getWishlist = async (req, res) => {
  const userId = req.user.userId;
  try {
    const wishlist = await Wishlist.findOne({ userId });
    res.json(wishlist || { products: [] });
  } catch (err) {
    console.error("Wishlist Add Error:", err); // ADD THIS
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist)
      return res.status(404).json({ message: "Wishlist not found" });

    wishlist.products = wishlist.products.filter(
      (p) => p.productId !== productId
    );
    await wishlist.save();

    res.json({ message: "Removed from wishlist", wishlist });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
