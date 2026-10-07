const express = require("express");

const router = express.Router();

const Cart = require("../models/Cart");

router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.params.userId
    }).populate("items.product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;