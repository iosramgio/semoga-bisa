import { HiShoppingBag } from "react-icons/hi";

const FeaturesSection = () => {
    return (
        <section className="py-10 px-3 bg-gray-50">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                {/* Fitur 1 */}
                <div className="flex flex-col items-center bg-white p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="p-2 sm:p-3 rounded-full bg-blue-500 text-white mb-2">
                        <HiShoppingBag className="text-xl sm:text-2xl" />
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base mb-1">Free International Shipping</h4>
                    <p className="text-gray-600 text-xs">On all orders over Rp 123,123</p>
                </div>

                {/* Fitur 2 */}
                <div className="flex flex-col items-center bg-white p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="p-2 sm:p-3 rounded-full bg-green-500 text-white mb-2">
                        <HiShoppingBag className="text-xl sm:text-2xl" />
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base mb-1">Secure Payment</h4>
                    <p className="text-gray-600 text-xs">Your payments are safe with us</p>
                </div>

                {/* Fitur 3 */}
                <div className="flex flex-col items-center bg-white p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="p-2 sm:p-3 rounded-full bg-red-500 text-white mb-2">
                        <HiShoppingBag className="text-xl sm:text-2xl" />
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base mb-1">24/7 Customer Support</h4>
                    <p className="text-gray-600 text-xs">We are always here to help you</p>
                </div>

                {/* Fitur 4 */}
                <div className="flex flex-col items-center bg-white p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="p-2 sm:p-3 rounded-full bg-yellow-500 text-white mb-2">
                        <HiShoppingBag className="text-xl sm:text-2xl" />
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base mb-1">Easy Returns</h4>
                    <p className="text-gray-600 text-xs">Hassle-free returns within 30 days</p>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
