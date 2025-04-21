import { motion } from "framer-motion";

const Gallery = () => {
  const galleryItems = [
    "https://picsum.photos/seed/produk1/500/500",
    "https://picsum.photos/seed/produk2/500/500",
    "https://picsum.photos/seed/produk3/500/500",
    "https://picsum.photos/seed/produk4/500/500",
    "https://picsum.photos/seed/produk5/500/500",
    "https://picsum.photos/seed/produk6/500/500",
    "https://picsum.photos/seed/produk7/500/500",
    "https://picsum.photos/seed/produk8/500/500",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Galeri</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Beberapa produk yang telah kami buat untuk klien kami.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {galleryItems.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={src}
                alt={`Produk ${index + 1}`}
                className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
