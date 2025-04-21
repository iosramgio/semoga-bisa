import Hero from "../components/Layout/Hero"
import AboutUsPreview from "../components/Product/AboutUsPreview"
import FinalCTA from "../components/Product/FinalCTA"
import Gallery from "../components/Product/Gallery"
import NewArrivals from "../components/Product/NewArrivals"
import OrderFlow from "../components/Product/OrderFlow"
import Services from "../components/Product/Services"
import WhyUs from "../components/Product/WhyUs"

const placeholderProducts = [
    {
        _id: 1,
        name: "Product 1",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=2", altText: "Product 1" }]
    },
    {
        _id: 2,
        name: "Product 2",
        price: 150,
        images: [{ url: "https://picsum.photos/500/500?random=3", altText: "Product 2" }]
    },
    {
        _id: 3,
        name: "Product 3",
        price: 200,
        images: [{ url: "https://picsum.photos/500/500?random=4", altText: "Product 3" }]
    },
    {
        _id: 4,
        name: "Product 4",
        price: 250,
        images: [{ url: "https://picsum.photos/500/500?random=5", altText: "Product 4" }]
    },
    {
        _id: 1,
        name: "Product 5",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=2", altText: "Product 1" }]
    },
    {
        _id: 2,
        name: "Product 6",
        price: 150,
        images: [{ url: "https://picsum.photos/500/500?random=3", altText: "Product 2" }]
    },
    {
        _id: 3,
        name: "Product 7",
        price: 200,
        images: [{ url: "https://picsum.photos/500/500?random=4", altText: "Product 3" }]
    },
    {
        _id: 4,
        name: "Product 8",
        price: 250,
        images: [{ url: "https://picsum.photos/500/500?random=5", altText: "Product 4" }]
    }
]

const Home = () => {
    return(
        <div className="relative">
            {/* Hero Section - Normal document flow */}
            <div className="relative">
                <Hero />
                {/* White fade-out effect at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10"></div>
            </div>
            
            {/* Main Content - Will cover Hero when scrolling */}
            <main className="relative bg-white -mt-16 z-20">
                <Services/>
                <OrderFlow/>
                <WhyUs />
                <NewArrivals />
                <Gallery/>
                <AboutUsPreview/>
                <FinalCTA/>
            </main>
        </div>
    )
}

export default Home