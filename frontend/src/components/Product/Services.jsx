import { FaTshirt, FaUserTie, FaCut, FaPaintBrush } from "react-icons/fa";
import produksiImg from "../../assets/featured.webp";
import { motion } from "framer-motion";

const services = [
  {
    icon: <FaUserTie className="text-xl text-indigo-600" />,
    title: "Pembuatan Seragam",
  },
  {
    icon: <FaTshirt className="text-xl text-pink-600" />,
    title: "Kaos Sablon / Polos",
  },
  {
    icon: <FaCut className="text-xl text-green-600" />,
    title: "Jahit Custom",
  },
  {
    icon: <FaPaintBrush className="text-xl text-yellow-600" />,
    title: "Sublimasi & Bordir",
  },
];

const Services = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold mb-6 text-gray-900 leading-tight">
            Layanan{" "}
            <span className="bg-gradient-to-r from-red-500 to-pink-700 bg-clip-text text-transparent">
              Kami
            </span>
          </h2>
          <p className="text-gray-600 mb-10">
            Kami menyediakan berbagai layanan konveksi berkualitas tinggi untuk memenuhi kebutuhan kamu, dari seragam hingga custom design eksklusif.
          </p>

          <div className="space-y-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="p-3 rounded-full bg-white shadow-md">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-gray-800">{service.title}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={produksiImg}
            alt="Proses Produksi"
            className="rounded-3xl shadow-xl transition duration-300 group-hover:scale-105"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
