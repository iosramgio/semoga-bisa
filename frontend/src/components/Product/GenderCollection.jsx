import { Link } from "react-router-dom";
import mensCollectionImage from "../../assets/mens-collection.webp";
import womensCollectionImage from "../../assets/womens-collection.webp";

const GenderCollectionSection = () => {
    const collections = [
        {
            id: 1,
            image: womensCollectionImage,
            alt: "Women's collection",
            title: "Women's Collection",
            link: "/collection/all?gender=women"
        },
        {
            id: 2,
            image: mensCollectionImage,
            alt: "Men's collection",
            title: "Men's Collection",
            link: "/collection/all?gender=men"
        }
    ];

    return (
        <section className="py-16 px-4 lg:px-0">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {collections.map((collection) => (
                    <div 
                        key={collection.id}
                        className="relative group overflow-hidden rounded-lg"
                    >
                        <img 
                            src={collection.image} 
                            alt={collection.alt} 
                            className="w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-8 transition-opacity duration-500 group-hover:bg-opacity-60">
                            <h2 className="text-3xl font-semibold text-white mb-3">
                                {collection.title}
                            </h2>
                            <Link 
                                to={collection.link} 
                                className="text-white text-lg underline font-medium"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GenderCollectionSection;