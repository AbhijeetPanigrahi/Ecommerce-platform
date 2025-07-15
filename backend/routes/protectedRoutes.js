// backend/routes/protectedRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/private", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized to access this protected route.",
    user: req.user, // contains id, name, email
  });
});

module.exports = router;
