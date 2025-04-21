const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

// @desc    Get all orders by user
// @route   GET /api/orders
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort("-createdAt")
      .populate("items.product", "name imageUrl");
    res.json(orders);
  } catch (error) {
    console.error("[Get Orders]", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product", "name imageUrl basePrice materials sizes colors");

    if (!order || order.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("[Get Order by ID]", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Update order status (admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
router.put("/:id/status", protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "In Production", "Shipped", "Completed", "Cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error("[Update Order Status]", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Cancel order (by user)
// @route   PUT /api/orders/:id/cancel
// @access  Private
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({
        message: "Order cannot be cancelled after payment"
      });
    }

    order.status = "Cancelled";
    await order.save();

    res.json(order);
  } catch (error) {
    console.error("[Cancel Order]", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
