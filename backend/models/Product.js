const mongoose = require ("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        requireq: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    discountPrice: {
        type: Number,
    },
    countInStock:{
        type: Number,
        required: true,
        default: 0,
    },
    sku: {
        type: String,
        unique: true, 
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
    },
    sizes: {
        type: [String],
        required: true,
    },
    colors: {
        type: [String],
        required: true,
    },
    collections: {
        type: String,
        required: true,
    },
    material: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["Men", "Woman", "Unisex"],
    },
    images: [
        {
            url:{
                type: String,
                required: true,
            },
            altText: {
                type: String,
            },
        },
    ],
    isFeatured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 0, 
    },
    tags: [string],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    dimensions: {
        length: Number,
        width: Number,
        height: Number,
    },
    weight: Number,
    },
    { timestamps: true }
);
    module.exports = mongoose.model("Product", productSchema);
    
