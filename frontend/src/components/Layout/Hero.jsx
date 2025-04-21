import { Link } from "react-router-dom";
import heroImg from "../../assets/rabbit-hero.webp";

const Hero = () => {
  return (
    <section className="relative h-[520px] md:h-[700px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Fashion Collection"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl space-y-6 text-white animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-700">
              Max
            </span>
            supply <br />
            <span className="font-light tracking-wide">Ready to Wear</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200/90">
            Koleksi eksklusif dari bahan berkualitas tinggi dan jahitan terbaik.
            Dirancang untuk kenyamanan dan gaya maksimal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              to="/shop"
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/40 transition duration-300"
            >
              Pesan Sekarang
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 border border-white text-white rounded-xl font-medium hover:bg-white hover:text-black transition duration-300"
            >
              Tentang Kami
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <svg
          className="w-6 h-6 text-white animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
