const express = require('express');
const mongoose = require('mongoose');
const Checkout = require('../models/Checkout');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Middleware untuk parsing JSON
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// @desc    Create checkout session
// @route   POST /api/checkout
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    // Validasi input
    const { shippingAddress, paymentMethod } = req.body;
    
    if (!shippingAddress || !shippingAddress.recipient || !shippingAddress.phone) {
      return res.status(400).json({ 
        message: 'Recipient name and phone number are required' 
      });
    }

    // Hapus checkout session lama jika ada
    await Checkout.deleteOne({ user: req.user._id });

    // Dapatkan cart user
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product', 'name basePrice pricePerDozen');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    // Hitung total harga
    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.priceSnapshot.totalPrice, 
      0
    );

    // Buat checkout baru
    const checkout = new Checkout({
      user: req.user._id,
      cart: cart._id,
      shippingAddress,
      paymentMethod: paymentMethod || 'Transfer',
      totalPrice,
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`
    });

    await checkout.save();
    
    res.status(201).json({
      _id: checkout._id,
      invoiceNumber: checkout.invoiceNumber,
      totalPrice: checkout.totalPrice,
      expiresAt: checkout.expiresAt
    });

  } catch (error) {
    console.error('Checkout error:', error);
    
    if (error.code === 11000) {
      res.status(400).json({ message: 'You already have an active checkout session' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// @desc    Get active checkout session
// @route   GET /api/checkout
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const checkout = await Checkout.findOne({ user: req.user._id })
      .populate({
        path: 'cart',
        populate: {
          path: 'items.product',
          select: 'name imageUrl basePrice'
        }
      });

    if (!checkout) {
      return res.status(404).json({ message: 'No active checkout session found' });
    }

    res.json({
      _id: checkout._id,
      items: checkout.cart.items,
      shippingAddress: checkout.shippingAddress,
      totalPrice: checkout.totalPrice,
      invoiceNumber: checkout.invoiceNumber
    });

  } catch (error) {
    console.error('Get checkout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Confirm checkout and create order
// @route   POST /api/checkout/confirm
// @access  Private
router.post('/confirm', protect, async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // 1. Cari checkout session yang aktif
    const checkout = await Checkout.findOne({
      user: req.user._id,
      expiresAt: { $gt: new Date() }
    })
    .populate({
      path: 'cart',
      populate: { 
        path: 'items.product',
        populate: {
          path: 'materials',
          select: 'name priceAdjustment'
        }
      }
    })
    .session(session);

    if (!checkout) {
      await session.abortTransaction();
      const exists = await Checkout.exists({ user: req.user._id });
      return res.status(404).json({
        success: false,
        message: exists ? "Checkout session expired" : "No checkout session found",
        solution: "Please restart checkout process"
      });
    }

    // 2. Validasi data shipping address
    const requiredShippingFields = ['recipient', 'street', 'city', 'postalCode', 'phone'];
    const missingFields = requiredShippingFields.filter(
      field => !checkout.shippingAddress[field]
    );

    if (missingFields.length > 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: `Missing shipping information: ${missingFields.join(', ')}`
      });
    }

    // 3. Generate order number
    const generateOrderNumber = async () => {
      const count = await Order.countDocuments().session(session);
      const date = new Date();
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `ORD${year}${month}${day}${(count + 1).toString().padStart(4, '0')}`;
    };

    // 4. Buat order items dengan validasi material
    const items = checkout.cart.items.map(item => {
      if (!item.product.materials || item.product.materials.length === 0) {
        throw new Error(`Product ${item.product._id} has no materials configured`);
      }

      const materialIndex = item.materialIndex || 0;
      const material = item.product.materials[materialIndex];
      
      if (!material) {
        throw new Error(`Material index ${materialIndex} not found for product ${item.product._id}`);
      }

      return {
        product: item.product._id,
        material: {
          name: material.name,
          priceAdjustment: material.priceAdjustment || 0
        },
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        customDesign: item.customDesign || undefined,
        priceSnapshot: {
          unitPrice: item.priceSnapshot.unitPrice,
          totalPrice: item.priceSnapshot.totalPrice,
          designFee: item.priceSnapshot.designFee || 0,
          wholesaleDiscount: item.priceSnapshot.wholesaleDiscount || 0
        }
      };
    });

    // 5. Hitung subtotal
    const subtotal = checkout.cart.items.reduce(
      (sum, item) => sum + item.priceSnapshot.totalPrice, 
      0
    );

    // 6. Buat order object
    const order = new Order({
      user: checkout.user,
      orderNumber: await generateOrderNumber(), // Generate sebelum save
      items,
      subtotal,
      shippingInfo: {
        recipientName: checkout.shippingAddress.recipient,
        phone: checkout.shippingAddress.phone,
        address: checkout.shippingAddress.street,
        city: checkout.shippingAddress.city,
        postalCode: checkout.shippingAddress.postalCode
      },
      payment: {
        method: checkout.paymentMethod.toLowerCase(),
        status: 'pending'
      },
      status: 'pending',
      productionNotes: req.body.productionNotes || ''
    });

    // 7. Simpan order dengan retry mechanism
    let retryCount = 0;
    const maxRetries = 3;
    let saveError;

    while (retryCount < maxRetries) {
      try {
        await order.save({ session });
        break;
      } catch (err) {
        saveError = err;
        retryCount++;
        if (retryCount >= maxRetries || err.code !== 11000) {
          throw err;
        }
        // Jika error karena duplicate key, generate nomor baru dan coba lagi
        order.orderNumber = await generateOrderNumber();
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // 8. Hapus cart dan checkout
    await Cart.deleteOne({ _id: checkout.cart._id }).session(session);
    await Checkout.deleteOne({ _id: checkout._id }).session(session);

    await session.commitTransaction();
    
    res.status(201).json({
      success: true,
      orderId: order._id,
      orderNumber: order.orderNumber,
      total: order.subtotal,
      status: order.status
    });

  } catch (error) {
    await session.abortTransaction();
    console.error("Confirm Order Error:", error);

    // Klasifikasi error untuk response yang lebih informatif
    let statusCode = 500;
    let errorMessage = "Failed to process order";

    if (error.message.includes('Material index') || 
        error.message.includes('no materials configured')) {
      statusCode = 400;
      errorMessage = "Product configuration error: " + error.message;
    } else if (error.message.includes('validation failed')) {
      statusCode = 400;
      errorMessage = "Validation error: " + error.message.split(': ')[1];
    } else if (error.code === 11000) {
      statusCode = 409;
      errorMessage = "Duplicate order detected, please try again";
    }

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    await session.endSession();
  }
});

module.exports = router;
