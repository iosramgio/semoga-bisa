import { Link } from "react-router-dom"
import featured from "../../assets/featured.webp"
import { motion } from "framer-motion"

const AboutUsPreview = () => {
  return (
    <section className="py-16 px-4 lg:px-0 bg-gradient-to-r bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="container mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center"
      >
        {/* Image section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="lg:w-1/2 w-full"
        >
          <img
            src={featured}
            alt="Tentang Kami"
            className="w-full h-full object-cover lg:rounded-l-3xl transition-transform duration-500 hover:scale-105"
          />
        </motion.div>

        {/* Text section */}
        <div className="lg:w-1/2 w-full p-10 md:p-14 text-center lg:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight"
          >
            Tentang{" "}
            <span className="bg-gradient-to-r from-red-500 to-pink-700 bg-clip-text text-transparent">
              Kami
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed"
          >
            Hakim Konveksi telah berdiri sejak tahun 2018 dan telah dipercaya berbagai kalangan untuk memproduksi pakaian custom berkualitas tinggi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
  to="/tentang-kami"
  className="inline-block bg-gradient-to-r from-red-700 to-pink-700 hover:scale-105
 text-white text-sm sm:text-base font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:bg-black hover:from-black hover:to-black"
>
  Selengkapnya →
</Link>

          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default AboutUsPreview
