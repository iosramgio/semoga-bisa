import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const FinalCTA = () => {
  return (
    <section className="bg-gradient-to-r from-red-700 to-pink-700 py-16 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="container mx-auto text-center text-white"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Siap Bikin Baju Custom? 
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Hubungi Kami Sekarang dan Wujudkan Desain Impianmu!
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/shop"
            className="bg-white text-red-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-all"
          >
            Pesan Sekarang
          </Link>
          <a
            href="https://wa.me/6281234567890" // Ganti dengan nomor WhatsApp kamu
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-900 transition-all"
          >
            Chat WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default FinalCTA
