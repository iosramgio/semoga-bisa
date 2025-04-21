const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  material: {
    name: { type: String, required: true },
    priceAdjustment: { type: Number, default: 0 }
  },
  size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [12, 'Minimal order 12 pcs']
  },
  customDesign: {
    description: String,
    images: [String]
  },
  priceSnapshot: {
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    designFee: { type: Number, default: 0 },
    wholesaleDiscount: { type: Number, default: 0 }
  }
});

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  items: [OrderItemSchema],
  subtotal: {
    type: Number,
    required: true
  },
  shippingInfo: {
    recipientName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    notes: String
  },
  payment: {
    method: { type: String, enum: ['transfer', 'cod'], required: true },
    status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    proofImage: String,
    paidAt: Date
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'in_production', 'shipped', 'completed', 'cancelled'],
    default: 'pending'
  },
  productionNotes: String
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate order number before saving
OrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const count = await Order.countDocuments();
    this.orderNumber = `ORD${year}${month}${day}${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema);