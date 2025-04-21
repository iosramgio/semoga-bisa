'use client'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-t from-gray-100 via-white to-white border-t pt-16 pb-10"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
        {/* Newsletter */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Newsletter</h3>
          <p className="text-gray-600 mb-4 text-sm">
            Dapatkan info terbaru dan promo spesial langsung ke email Anda.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="p-3 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
            <button
              type="submit"
              className="px-4 py-3 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-all"
            >
              Berlangganan
            </button>
          </form>
        </motion.div>

        {/* Tentang Kami */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Tentang Kami</h3>
          <p className="text-gray-600 text-sm mb-3">
            Hakim Konveksi telah berpengalaman lebih dari 5 tahun dalam dunia konveksi pakaian.
            Kami mengutamakan kualitas, ketepatan waktu, dan kepuasan pelanggan.
          </p>
          <a
            href="/tentang-kami"
            className="inline-block mt-2 text-sm text-gray-700 hover:text-gray-900 font-medium underline underline-offset-4 transition"
          >
            Selengkapnya →
          </a>
        </motion.div>

        {/* Bantuan */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Bantuan</h3>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li><a href="#" className="hover:text-gray-800 transition">FAQ</a></li>
            <li><a href="#" className="hover:text-gray-800 transition">Kontak Kami</a></li>
            <li><a href="#" className="hover:text-gray-800 transition">Kebijakan Pengembalian</a></li>
          </ul>
        </motion.div>

        {/* Lokasi */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Lokasi Kami</h3>
          <div className="w-full h-48 rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31693.623879758683!2d106.73899556699907!3d-6.344814637750195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec1a12345678%3A0xabcdefabcdef!2sPamulang%2C%20Tangerang%20Selatan!5e0!3m2!1sid!2sid!4v171234567890"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 pt-6 border-t text-center text-sm text-gray-500 px-6"
      >
        <p>&copy; {new Date().getFullYear()} Hakim Konveksi. Semua hak dilindungi.</p>
        <p className="mt-1">Desain & konten dilindungi hak cipta. Dilarang menggunakan tanpa izin tertulis.</p>
      </motion.div>
    </motion.footer>
  )
}

export default Footer;
