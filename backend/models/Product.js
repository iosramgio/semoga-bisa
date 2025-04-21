const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    // IDENTITAS PRODUK
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000
    },
    SKU: {
      type: String,
      unique: true,
      required: true
    },
    productType: {
      type: String,
      required: true,
      enum: ["Atasan", "Bawahan", "Atribut"]
    },
    imageUrl: {
      type: String,
      required: false
    },

    // HARGA & BIAYA
    basePrice: {
      type: Number,
      required: true
    },
    pricePerDozen: {
      type: Number,
      validate: {
        validator: function(v) {
          return v <= this.basePrice * 12;
        },
        message: "Harga lusin tidak boleh lebih mahal dari harga satuan × 12"
      }
    },
    minOrder: {
      type: Number,
      default: 12,
      min: 12
    },

    // MATERIAL & PRODUKSI
    materials: [{
      name: { type: String, required: true },
      priceAdjustment: { type: Number, default: 0 }
    }],
    sizes: [String],
    colors: [String],

    // OPSI DESAIN CUSTOM
    allowCustomDesign: {
      type: Boolean,
      default: false
    },
    designFee: {
      type: Number,
      default: 0
    },
    designGuide: String,

    // STATUS
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);