const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  materialIndex: {
    type: Number,
    required: true,
    min: 0
  },
  size: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [12, 'Minimum order is 12 pieces']
  },
  customDesign: {
    description: String,
    images: [String] // Cloudinary URLs
  },
  priceSnapshot: {
    unitPrice: { type: Number, required: true },
    designFee: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true }
  }
}, { timestamps: true });

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // One cart per user
  },
  items: [CartItemSchema],
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiry
    index: { expires: 0 } // Auto-delete after expiresAt
  }
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);