const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

require("dotenv").config();

const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Cloudinary storage setup for images
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Nama folder di Cloudinary
    allowedFormats: ['jpg', 'jpeg', 'png'], // Format yang diizinkan
  },
});

const upload = multer({ storage });

// Route untuk upload gambar
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // Cloudinary URL setelah upload sukses
    res.json({ imageUrl: req.file.path }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Multer Cloudinary storage setup untuk desain custom (mendukung beberapa file)
const designStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'custom-designs',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // support PDF juga
  },
});
const uploadDesign = multer({ storage: designStorage });

// Route untuk upload desain custom
router.post("/custom", uploadDesign.array("image", 5), async (req, res) => {  // Upload multiple files (max 5)
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Map each uploaded file URL
    const fileUrls = req.files.map(file => file.path);

    res.json({
      message: "Custom designs uploaded",
      fileUrls: fileUrls,  // Array of uploaded file URLs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
