import { FaMoneyBillWave, FaStar, FaClock, FaComments } from "react-icons/fa";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: <FaMoneyBillWave className="text-3xl text-white" />,
    title: "Harga Terjangkau",
    desc: "Kualitas tinggi tidak harus mahal. Kami selalu memberikan harga yang bersahabat.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: <FaStar className="text-3xl text-white" />,
    title: "Bahan Berkualitas",
    desc: "Menggunakan bahan terbaik yang nyaman dipakai dan tahan lama.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: <FaClock className="text-3xl text-white" />,
    title: "Proses Cepat",
    desc: "Tim profesional kami menjamin pengerjaan cepat tanpa mengorbankan kualitas.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: <FaComments className="text-3xl text-white" />,
    title: "Bisa Konsultasi Desain",
    desc: "Punya ide sendiri? Konsultasikan langsung dengan tim desain kami secara gratis.",
    color: "from-pink-400 to-rose-500",
  },
];

const WhyUs = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 text-center">
        {/* Judul Animasi */}
        <motion.h2
          className="text-4xl font-extrabold mb-12 text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Kenapa{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-700">
            Memilih Kami?
          </span>
        </motion.h2>

        {/* Cards */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div
                className={`w-12 h-12 mb-4 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}
              >
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
