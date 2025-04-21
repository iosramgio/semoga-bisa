import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NewArrivals = () => {
  const scrollRef = useRef(null);

  const newArrivals = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: 120,
      images: [{ url: "https://picsum.photos/500/500?random=1", altText: "Stylish Jacket" }],
    },
    {
      _id: "2",
      name: "Trendy Hoodie",
      price: 90,
      images: [{ url: "https://picsum.photos/500/500?random=2", altText: "Trendy Hoodie" }],
    },
    {
      _id: "3",
      name: "Classic Coat",
      price: 150,
      images: [{ url: "https://picsum.photos/500/500?random=3", altText: "Classic Coat" }],
    },
    {
      _id: "4",
      name: "Sporty Windbreaker",
      price: 110,
      images: [{ url: "https://picsum.photos/500/500?random=4", altText: "Sporty Windbreaker" }],
    },
    {
      _id: "5",
      name: "Elegant Blazer",
      price: 140,
      images: [{ url: "https://picsum.photos/500/500?random=5", altText: "Elegant Blazer" }],
    },
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center mb-12">
        <motion.h2
          className="text-4xl font-extrabold hover:text-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-700 hover:bg-clip-text transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Katalog
        </motion.h2>
        <motion.p
          className="text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Temukan koleksi produk terbaik dari kami dengan kualitas dan gaya terbaik.
        </motion.p>
      </div>

      <div className="container mx-auto px-6">
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto py-4 snap-x snap-mandatory custom-scrollbar"
        >
          {newArrivals.map((product, index) => (
            <motion.div
              key={product._id}
              className="min-w-[280px] sm:min-w-[320px] bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 snap-center group"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-t-3xl">
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.altText || product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 text-left">
                <Link
                  to={`/product/${product._id}`}
                  className="block text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-pink-700 group-hover:bg-clip-text"
                >
                  {product.name}
                </Link>
                <p className="text-sm text-gray-500 mt-1 transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:text-black group-hover:bg-clip-text">
                  Harga mulai dari
                </p>
                <p className="text-lg font-bold mt-1 transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-pink-700 group-hover:bg-clip-text">
                  Rp. {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
