const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @desc    Get all active products
// @route   GET /api/products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { type, search } = req.query;
    const query = { isActive: true };

    if (type) query.productType = type;
    if (search) query.name = { $regex: search, $options: "i" };

    const products = await Product.find(query)
      .sort({ name: 1 })
      .select("-__v");

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("-__v");

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Create product with image and design options
// @route   POST /api/products
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const { 
      name, 
      description, 
      SKU, 
      productType, 
      imageUrl,
      basePrice, 
      pricePerDozen,
      allowCustomDesign,
      designFee,
      designGuide,
      materials, 
      sizes, 
      colors
    } = req.body;

    // Validasi
    if (!name || !description || !SKU || !basePrice || !imageUrl) {
      return res.status(400).json({ message: "Field wajib tidak lengkap" });
    }

    if (pricePerDozen && pricePerDozen > basePrice * 12) {
      return res.status(400).json({ message: "Harga lusin tidak valid" });
    }

    const product = new Product({
      name,
      description,
      SKU,
      productType,
      imageUrl,
      basePrice,
      pricePerDozen,
      allowCustomDesign: allowCustomDesign || false,
      designFee: designFee || 0,
      designGuide,
      materials: materials || [{ name: "Default", priceAdjustment: 0 }],
      sizes: sizes || ["S", "M", "L"],
      colors: colors || ["Hitam", "Putih"]
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).json({ message: "SKU sudah ada" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

// @desc    Update product (all fields)
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      productType,
      imageUrl,
      basePrice,
      pricePerDozen,
      allowCustomDesign,
      designFee,
      designGuide,
      materials,
      sizes,
      colors,
      isActive
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    // Validasi harga per lusin
    if (pricePerDozen !== undefined && pricePerDozen > (basePrice || product.basePrice) * 12) {
      return res.status(400).json({ message: "Harga lusin tidak valid" });
    }

    // Validasi URL gambar jika diupdate
    if (imageUrl !== undefined) {
      if (!imageUrl) {
        return res.status(400).json({ message: "URL gambar diperlukan" });
      }
      product.imageUrl = imageUrl;
    }

    // Update fields biasa
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (productType !== undefined) product.productType = productType;
    if (basePrice !== undefined) product.basePrice = basePrice;
    if (pricePerDozen !== undefined) product.pricePerDozen = pricePerDozen;
    if (materials !== undefined) product.materials = materials;
    if (sizes !== undefined) product.sizes = sizes;
    if (colors !== undefined) product.colors = colors;
    if (isActive !== undefined) product.isActive = isActive;

    // Update fields desain custom
    if (allowCustomDesign !== undefined) product.allowCustomDesign = allowCustomDesign;
    if (designFee !== undefined) product.designFee = designFee;
    if (designGuide !== undefined) product.designGuide = designGuide;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Delete product (soft delete)
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    product.isActive = false;
    await product.save();

    res.json({ message: "Produk berhasil dinonaktifkan" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Calculate order price with custom design
// @route   POST /api/products/calculate-price
// @access  Public
router.post("/calculate-price", async (req, res) => {
  try {
    const { productId, materialIndex, quantity, customDesign } = req.body;

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    // Validasi minimal order
    if (quantity < product.minOrder) {
      return res.status(400).json({ 
        message: `Minimal order ${product.minOrder} pcs (${product.minOrder/12} lusin)`
      });
    }

    // Validasi material
    const material = product.materials[materialIndex];
    if (!material) {
      return res.status(400).json({ 
        message: "Material tidak valid",
        availableMaterials: product.materials 
      });
    }

    // Hitung harga dasar
    let pricePerPiece = product.basePrice + (material.priceAdjustment || 0);
    let totalPrice = pricePerPiece * quantity;

    // Cek harga per lusin jika ada
    if (quantity >= 12 && product.pricePerDozen) {
      const dozenPrice = (quantity / 12) * product.pricePerDozen;
      totalPrice = Math.min(totalPrice, dozenPrice);
    }

    // Validasi dan tambah biaya desain jika ada
    let designFee = 0;
    if (customDesign) {
      if (!product.allowCustomDesign) {
        return res.status(400).json({ message: "Produk tidak menerima desain custom" });
      }
      designFee = product.designFee || 0;
      totalPrice += designFee;
    }

    res.json({
      product: product.name,
      material: material.name,
      quantity,
      pricePerPiece,
      totalPrice,
      customDesign: customDesign ? {
        fee: designFee,
        allowed: true,
        guide: product.designGuide
      } : null,
      breakdown: {
        basePrice: product.basePrice,
        materialAdjustment: material.priceAdjustment || 0,
        wholesaleDiscount: product.pricePerDozen && quantity >= 12 ? 
          (pricePerPiece * quantity) - (quantity / 12 * product.pricePerDozen) : 0,
        designFee
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;