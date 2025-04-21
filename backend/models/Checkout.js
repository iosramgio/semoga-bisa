// models/Checkout.js
const mongoose = require("mongoose");

const CheckoutSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    unique: true // Satu checkout aktif per user
  },
  cart: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Cart", 
    required: true 
  },
  shippingAddress: {
    recipient: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true }
  },
  paymentMethod: { 
    type: String, 
    enum: ["Transfer", "COD"], 
    required: true 
  },
  totalPrice: { type: Number, required: true },
  invoiceNumber: { type: String, unique: true },
  expiresAt: { 
    type: Date, 
    default: () => new Date(Date.now() + 30 * 60 * 1000), // Kadaluarsa dalam 30 menit
    index: { expires: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model("Checkout", CheckoutSchema);