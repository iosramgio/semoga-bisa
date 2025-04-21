const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product', 'name imageUrl basePrice pricePerDozen allowCustomDesign designFee materials sizes colors');

    if (!cart) {
      return res.json({ items: [] }); // Return empty cart if not exists
    }

    res.json(cart);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Add item to cart
// @route   POST /api/cart/items
// @access  Private
router.post('/items', protect, async (req, res) => {
  try {
    const { productId, materialIndex, size, color, quantity, customDesign } = req.body;

    // Validate product
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found or inactive' });
    }

    // Validate material
    if (materialIndex < 0 || materialIndex >= product.materials.length) {
      return res.status(400).json({
        message: 'Invalid material selection',
        availableMaterials: product.materials
      });
    }

    // Validate size
    if (!product.sizes.includes(size)) {
      return res.status(400).json({
        message: 'Invalid size selected',
        availableSizes: product.sizes
      });
    }

    // Validate color
    if (!product.colors.includes(color)) {
      return res.status(400).json({
        message: 'Invalid color selected',
        availableColors: product.colors
      });
    }

    // Validate quantity
    if (quantity < product.minOrder) {
      return res.status(400).json({
        message: `Minimum order is ${product.minOrder} pieces`,
        minOrder: product.minOrder
      });
    }

    // Validate custom design
    let designFee = 0;
    if (customDesign) {
      if (!product.allowCustomDesign) {
        return res.status(400).json({ message: 'This product does not accept custom designs' });
      }
      designFee = product.designFee || 0;
    }

    // Calculate prices
    const material = product.materials[materialIndex];
    const unitPrice = product.basePrice + (material.priceAdjustment || 0);
    let totalPrice = unitPrice * quantity;

    // Apply wholesale discount if applicable
    if (quantity >= 12 && product.pricePerDozen) {
      totalPrice = Math.min(totalPrice, (quantity / 12) * product.pricePerDozen);
    }

    // Add design fee
    totalPrice += designFee;

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Add item to cart
    cart.items.push({
      product: productId,
      materialIndex,
      size,
      color,
      quantity,
      customDesign: customDesign || undefined,
      priceSnapshot: {
        unitPrice,
        designFee,
        totalPrice
      }
    });

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update cart item
// @route   PUT /api/cart/items/:itemId
// @access  Private
router.put('/items/:itemId', protect, async (req, res) => {
  try {
    const { quantity, customDesign } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.equals(req.params.itemId));
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const item = cart.items[itemIndex];
    const product = await Product.findById(item.product);

    // Validate new quantity
    if (quantity && quantity < product.minOrder) {
      return res.status(400).json({
        message: `Minimum order is ${product.minOrder} pieces`,
        minOrder: product.minOrder
      });
    }

    // Update item
    if (quantity) item.quantity = quantity;
    if (customDesign !== undefined) {
      if (customDesign && !product.allowCustomDesign) {
        return res.status(400).json({ message: 'This product does not accept custom designs' });
      }
      item.customDesign = customDesign || undefined;
      item.priceSnapshot.designFee = customDesign ? (product.designFee || 0) : 0;
    }

    // Recalculate price
    const material = product.materials[item.materialIndex];
    item.priceSnapshot.unitPrice = product.basePrice + (material.priceAdjustment || 0);
    let totalPrice = item.priceSnapshot.unitPrice * item.quantity;

    if (item.quantity >= 12 && product.pricePerDozen) {
      totalPrice = Math.min(totalPrice, (item.quantity / 12) * product.pricePerDozen);
    }

    item.priceSnapshot.totalPrice = totalPrice + item.priceSnapshot.designFee;

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:itemId
// @access  Private
router.delete('/items/:itemId', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => !item._id.equals(req.params.itemId));
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;