import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
    name: "Stylish Jacket",
    price: 1233,
    originPrice: 123,
    description: "This premium jacket combines style and comfort for any occasion.",
    material: "Genuine Leather",
    sizes: ["S", "M", "L", "XL"],
    colors: ["red", "black", "white"],
    images: [
        { url: "https://picsum.photos/500/500?random=1", altText: "Front view of stylish jacket" },
        { url: "https://picsum.photos/500/500?random=2", altText: "Side view of stylish jacket" }
    ]
};

const similarProducts = [
    {
        _id: 1,
        name: "Trendy Bomber Jacket",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=2", altText: "Trendy Bomber Jacket" }]
    },
    {
        _id: 2,
        name: "Classic Denim Jacket",
        price: 150,
        images: [{ url: "https://picsum.photos/500/500?random=3", altText: "Classic Denim Jacket" }]
    },
    {
        _id: 3,
        name: "Winter Parka",
        price: 200,
        images: [{ url: "https://picsum.photos/500/500?random=4", altText: "Winter Parka" }]
    },
    {
        _id: 4,
        name: "Lightweight Windbreaker",
        price: 250,
        images: [{ url: "https://picsum.photos/500/500?random=5", altText: "Lightweight Windbreaker" }]
    }
];

const ProductDetails = () => {
    const [mainImage, setMainImage] = useState(selectedProduct.images[0]?.url || "");
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleQuantityChange = (action) => {
        if (action === "plus") {
            setQuantity((prev) => prev + 1);
        } else if (action === "minus" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };
    
    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Please select both size and color", {
                duration: 1500,
                style: { background: '#ef4444', color: 'white' }
            });
            return;
        }
    
        setIsButtonDisabled(true);
        
        // Simulate API call
        setTimeout(() => {
            toast.success("Added to cart successfully!", {
                duration: 1500,
                style: { background: '#10b981', color: 'white' }
            });
            setIsButtonDisabled(false);
        }, 500);
    };

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-sm">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Image Gallery */}
                    <div className="lg:w-1/2">
                        <div className="hidden md:flex flex-col gap-4 float-left mr-4">
                            {selectedProduct.images.map((image, index) => (
                                <button 
                                    key={index}
                                    onClick={() => setMainImage(image.url)}
                                    className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                                        mainImage === image.url ? "border-black" : "border-gray-200 hover:border-gray-400"
                                    }`}
                                >
                                    <img
                                        src={image.url}
                                        alt={image.altText}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                            <img
                                src={mainImage}
                                alt="Main product view"
                                className="w-full h-full object-contain"
                                loading="eager"
                            />
                        </div>

                        {/* Mobile Thumbnails */}
                        <div className="md:hidden flex gap-3 mt-4 overflow-x-auto py-2">
                            {selectedProduct.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setMainImage(image.url)}
                                    className={`flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border ${
                                        mainImage === image.url ? "border-2 border-black" : "border-gray-200"
                                    }`}
                                >
                                    <img
                                        src={image.url}
                                        alt={image.altText}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:w-1/2 lg:pl-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            {selectedProduct.name}
                        </h1>

                        <div className="flex items-center gap-3 mb-4">
                            {selectedProduct.originPrice && (
                                <span className="text-lg text-gray-500 line-through">
                                    Rp{selectedProduct.originPrice.toLocaleString()}
                                </span>
                            )}
                            <span className="text-xl font-semibold text-gray-900">
                                Rp{selectedProduct.price.toLocaleString()}
                            </span>
                        </div>

                        <p className="text-gray-600 mb-6">
                            {selectedProduct.description}
                        </p>

                        {/* Color Selection */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                            <div className="flex gap-2">
                                {selectedProduct.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                                            selectedColor === color ? "border-black scale-110" : "border-gray-300 hover:border-gray-500"
                                        }`}
                                        style={{ backgroundColor: color }}
                                        aria-label={`Select ${color} color`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedProduct.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded-md border transition-all ${
                                            selectedSize === size 
                                                ? "bg-black text-white border-black" 
                                                : "bg-white text-gray-900 border-gray-300 hover:border-gray-500"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                            <div className="flex items-center gap-4 w-fit border rounded-md overflow-hidden">
                                <button
                                    onClick={() => handleQuantityChange("minus")}
                                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="w-8 text-center">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange("plus")}
                                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={isButtonDisabled}
                            className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
                                isButtonDisabled
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-black text-white hover:bg-gray-800"
                            }`}
                        >
                            {isButtonDisabled ? "Adding..." : "Add to Cart"}
                        </button>

                        {/* Product Details */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Product Details</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Material</p>
                                    <p className="text-gray-900">{selectedProduct.material}</p>
                                </div>
                                {/* Add more product details here if needed */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                <div className="mt-16 pt-10 border-t border-gray-200">
                    <h2 className="text-xl sm:text-2xl font-medium text-center mb-8">
                        You May Also Like
                    </h2>
                    <ProductGrid products={similarProducts} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;