const CartItem = require("../models/cart");

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, title, price, image } = req.body;
  const userId = req.user.userId;

  try {
    // Check if the item already exists in the user's cart
    let existingItem = await CartItem.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
    } else {
      const newItem = new CartItem({
        userId,
        productId,
        title,
        price,
        image,
      });
      await newItem.save();
    }

    res.json({ message: "Item added to cart" });
  } catch (err) {
    console.error("Add to Cart Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get cart items
exports.getCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    const cartItems = await CartItem.find({ userId });
    res.json(cartItems);
  } catch (err) {
    console.error("Fetch Cart Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE cart item
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const itemId = req.params.id;

    const removed = await CartItem.findOneAndDelete({ _id: itemId, userId });
    if (!removed) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Remove Cart Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
