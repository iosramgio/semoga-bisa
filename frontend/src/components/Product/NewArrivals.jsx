import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const NewArrivals = () => {
    const scrollRef = useRef(null);

    const newArrivals = [
        { _id: "1", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=1", altText: "Stylish Jacket" }] },
        { _id: "2", name: "Trendy Hoodie", price: 90, images: [{ url: "https://picsum.photos/500/500?random=2", altText: "Trendy Hoodie" }] },
        { _id: "3", name: "Classic Coat", price: 150, images: [{ url: "https://picsum.photos/500/500?random=3", altText: "Classic Coat" }] },
        { _id: "4", name: "Sporty Windbreaker", price: 110, images: [{ url: "https://picsum.photos/500/500?random=4", altText: "Sporty Windbreaker" }] },
        { _id: "5", name: "Elegant Blazer", price: 140, images: [{ url: "https://picsum.photos/500/500?random=5", altText: "Elegant Blazer" }] }
    ];

    useEffect(() => {
        const container = scrollRef.current;
        let isDown = false;
        let startX;
        let scrollLeft;

        const handleMouseDown = (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
        };

        const handleMouseUp = () => {
            isDown = false;
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; 
            container.scrollLeft = scrollLeft - walk;
        };

        container.addEventListener("mousedown", handleMouseDown);
        container.addEventListener("mouseleave", handleMouseLeave);
        container.addEventListener("mouseup", handleMouseUp);
        container.addEventListener("mousemove", handleMouseMove);

        return () => {
            container.removeEventListener("mousedown", handleMouseDown);
            container.removeEventListener("mouseleave", handleMouseLeave);
            container.removeEventListener("mouseup", handleMouseUp);
            container.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto text-center mb-10">
                <h2 className="text-4xl font-extrabold mb-4">Explore New Arrivals</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover the latest styles, handpicked for your wardrobe.
                </p>
            </div>
            
            <div ref={scrollRef} className="container mx-auto flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 py-4 scrollbar-hide">
                {newArrivals.map((product) => (
                    <div key={product._id} className="snap-center min-w-[300px] sm:min-w-[400px] relative bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105">
                        <img 
                            src={product.images[0]?.url} 
                            alt={product.images[0]?.altText || product.name} 
                            className="w-full h-72 object-cover"
                        />
                        <div className="p-4 text-center bg-white/70 backdrop-blur-md rounded-md">
                            <Link to={`/product/${product._id}`} className="block text-xl font-semibold text-gray-800 hover:text-blue-500">
                                {product.name}
                            </Link>
                            <p className="text-gray-600 mt-2">Rp.{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;
