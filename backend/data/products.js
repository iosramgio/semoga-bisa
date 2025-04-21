const products = [
    {
      name: "Kaos Oversize Polos",
      description: "Kaos nyaman dan stylish untuk kegiatan sehari-hari.",
      price: 120000,
      discountPrice: 95000,
      countInStock: 50,
      sku: "KOS001",
      category: "Kaos",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Hitam", "Putih", "Abu-abu"],
      materials: ["Cotton Combed 30s", "Cotton Combed 24s"],
      customizable: true,
      collections: "Casual",
      images: [
        {
          url: "https://example.com/images/kaos1-depan.jpg",
          altText: "Tampilan depan kaos",
        },
        {
          url: "https://example.com/images/kaos1-belakang.jpg",
          altText: "Tampilan belakang kaos",
        },
      ],
      isFeatured: true,
      rating: 4.7,
      tags: ["daily", "oversize", "polos"],
    },
    {
      name: "Hoodie Zipper",
      description: "Hoodie zipper hangat cocok untuk cuaca dingin.",
      price: 180000,
      discountPrice: 150000,
      countInStock: 30,
      sku: "HDZ001",
      category: "Hoodie",
      sizes: ["M", "L", "XL"],
      colors: ["Navy", "Abu Tua"],
      materials: ["Fleece", "Baby Terry"],
      customizable: false,
      collections: "Winter Collection",
      images: [
        {
          url: "https://example.com/images/hoodie1.jpg",
          altText: "Hoodie tampak depan",
        },
      ],
      isFeatured: false,
      rating: 4.5,
      tags: ["hangat", "zipper", "hoodie"],
    },
  ];
  
  module.exports = products;
  