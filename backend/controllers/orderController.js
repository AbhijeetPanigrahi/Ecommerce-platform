const Order = require("../models/order");

// Backend Receives and Saves the Order
exports.createOrder = async (req, res) => {
  const userId = req.user.userId;
  const { items, totalAmount } = req.body;

  try {
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      status: "Placed",
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (err) {
    console.error("error message: ", err);
    res.status(500).json({ message: "Server error" });
  }
};

// fetch all orders for the logged-in user.
exports.getOrders = async (req, res) => {
  const userId = req.user.userId;

  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
