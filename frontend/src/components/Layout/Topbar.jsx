import { IoLogoWhatsapp, IoLogoInstagram } from "react-icons/io5";
import { SiGooglemaps } from "react-icons/si";

const Topbar = () => {
  return (
    <div className="bg-gradient-to-r from-red-800 to-pink-700 text-white text-xs sm:text-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Social Media */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://wa.me/628214606269" 
              target="_blank" 
              rel="noreferrer"
              className="hover:scale-110 transition-transform duration-200"
              aria-label="WhatsApp"
            >
              <IoLogoWhatsapp className="h-4 w-4" />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noreferrer"
              className="hover:scale-110 transition-transform duration-200"
              aria-label="Instagram"
            >
              <IoLogoInstagram className="h-4 w-4" />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noreferrer"
              className="hover:scale-110 transition-transform duration-200"
              aria-label="Google Maps"
            >
              <SiGooglemaps className="h-4 w-4" />
            </a>
          </div>

          {/* Info Lokasi */}
          <div className="text-center px-2">
            <span className="inline-block bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
              🏠 Konveksi di <strong>Pamulang</strong> • 📦 Pengiriman ke seluruh Indonesia
            </span>
          </div>

          {/* Kontak WhatsApp */}
          <div className="hidden md:block">
            <a 
              href="https://wa.me/628214606269" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-1 hover:underline"
            >
              <IoLogoWhatsapp className="h-4 w-4" />
              <span>+62 821-4606-269</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;