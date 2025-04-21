import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product, index) => (
                <Link
                    key={index}
                    to={`/product/${product._id}`}
                    className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                    <div className="w-full h-64 sm:h-72 md:h-80 overflow-hidden rounded-t-2xl">
                        <img
                            src={product.images[0].url}
                            alt={product.images[0].altText || product.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="text-base font-semibold text-gray-800 mb-1 truncate">
                            {product.name}
                        </h3>
                        <p className="text-sm text-red-700 font-medium">
                            Rp {product.price.toLocaleString()}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProductGrid;
