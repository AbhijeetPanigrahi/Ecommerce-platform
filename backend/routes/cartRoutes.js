// const express = require("express");
// const router = express.Router();
// const protect = require("../middleware/authMiddleware");

// // Example: Add to cart (protected route)
// router.post("/add", protect, (req, res) => {
//   // Use req.user to access user info
//   res.json({
//     message: "Item added to cart",
//     user: req.user,
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/remove/:id", authMiddleware, removeFromCart);

module.exports = router;
