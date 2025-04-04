import { HiShoppingBag } from "react-icons/hi";

const FeaturesSection = () => {
    const features = [
        {
            id: 1,
            iconBg: "bg-blue-500",
            title: "Free International Shipping",
            description: "On all orders over Rp 123,123",
            icon: <HiShoppingBag className="text-xl sm:text-2xl" />
        },
        {
            id: 2,
            iconBg: "bg-green-500",
            title: "Secure Payment",
            description: "Your payments are safe with us",
            icon: <HiShoppingBag className="text-xl sm:text-2xl" />
        },
        {
            id: 3,
            iconBg: "bg-red-500",
            title: "24/7 Customer Support",
            description: "We are always here to help you",
            icon: <HiShoppingBag className="text-xl sm:text-2xl" />
        },
        {
            id: 4,
            iconBg: "bg-yellow-500",
            title: "Easy Returns",
            description: "Hassle-free returns within 30 days",
            icon: <HiShoppingBag className="text-xl sm:text-2xl" />
        }
    ];

    return (
        <section className="py-10 px-3 bg-gray-50">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.map((feature) => (
                    <div 
                        key={feature.id}
                        className="flex flex-col items-center bg-white p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                    >
                        <div className={`p-2 sm:p-3 rounded-full ${feature.iconBg} text-white mb-2`}>
                            {feature.icon}
                        </div>
                        <h4 className="font-semibold text-sm sm:text-base mb-1 text-center">
                            {feature.title}
                        </h4>
                        <p className="text-gray-600 text-xs text-center">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;