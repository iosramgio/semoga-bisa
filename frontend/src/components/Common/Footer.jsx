const Footer = () => {
    return (
        <footer className="border-t py-12 bg-gray-50">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
                
                {/* Newsletter Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Newsletter</h3>
                    <p className="text-gray-500 mb-4">
                        Dapatkan informasi terbaru tentang produk dan promo eksklusif langsung di email Anda.
                    </p>
                    <form className="flex">
                        <input 
                            type="email" 
                            placeholder="Masukkan email Anda" 
                            className="p-3 w-full text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                            required
                        />
                        <button 
                            type="submit" 
                            className="px-4 py-3 bg-gray-800 text-white text-sm font-medium rounded-r-md hover:bg-gray-700 transition-all"
                        >
                            Berlangganan
                        </button>
                    </form>
                </div>

                {/* Additional Info */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Tentang Kami</h3>
                    <p className="text-gray-500">
                        Kami adalah perusahaan yang berkomitmen menyediakan pakaian berkualitas tinggi dengan desain custom dan harga terjangkau.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Bantuan</h3>
                    <ul className="text-gray-500 space-y-2">
                        <li><a href="#" className="hover:text-gray-800">FAQ</a></li>
                        <li><a href="#" className="hover:text-gray-800">Kontak Kami</a></li>
                        <li><a href="#" className="hover:text-gray-800">Kebijakan Pengembalian</a></li>
                    </ul>
                </div>

                {/* Google Maps Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Lokasi Kami</h3>
                    <div className="w-full h-48 rounded-md overflow-hidden shadow-md">
                        <iframe
                            className="w-full h-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31693.623879758683!2d106.73899556699907!3d-6.344814637750195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec1a12345678%3A0xabcdefabcdef!2sPamulang%2C%20Tangerang%20Selatan!5e0!3m2!1sid!2sid!4v171234567890"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* License & Copyright Section */}
            <div className="mt-8 border-t bg-maxx-black pt-4 pb-4 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Hakim Konveksi. Semua hak dilindungi.</p>
                <p>Konten dan desain dilindungi oleh undang-undang hak cipta. Dilarang menggunakan tanpa izin.</p>
            </div>
        </footer>
    )
}
 
export default Footer;
