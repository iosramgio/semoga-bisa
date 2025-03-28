import { Link } from "react-router-dom";
import mensCollectionImage from "../../assets/mens-collection.webp";
import womensCollectionImage from "../../assets/womens-collection.webp";

const GenderCollectionSection = () => {
    return (
        <section className="py-16 px-4 lg:px-0">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Women's collection */}
                <div className="relative group overflow-hidden rounded-lg">
                    <img 
                        src={womensCollectionImage} 
                        alt="Women collection" 
                        className="w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-8 transition-opacity duration-500 group-hover:bg-opacity-60">
                        <h2 className="text-3xl font-semibold text-white mb-3">Women's Collection</h2>
                        <Link to="/collection/all?gender=women" className="text-white text-lg underline font-medium">
                            Shop Now
                        </Link>
                    </div>
                </div>
                {/* Men's collection */}
                <div className="relative group overflow-hidden rounded-lg">
                    <img 
                        src={mensCollectionImage} 
                        alt="Men collection" 
                        className="w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-8 transition-opacity duration-500 group-hover:bg-opacity-60">
                        <h2 className="text-3xl font-semibold text-white mb-3">Men's Collection</h2>
                        <Link to="/collection/all?gender=men" className="text-white text-lg underline font-medium">
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GenderCollectionSection;
