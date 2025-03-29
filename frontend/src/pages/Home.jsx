import Hero from "../components/Layout/Hero"
import FeaturedCollection from "../components/Product/FeaturedCollection"
import GenderCollectionSection from "../components/Product/GenderCollection"
import NewArrivals from "../components/Product/NewArrivals"
import ProductDetails from "../components/Product/ProductDetails"
import ProductGrid from "../components/Product/ProductGrid"

const placeholderProducts =[
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
        <div>
            <Hero/>
            <GenderCollectionSection/>
            <NewArrivals/>

            <h2 className="text-3xl text-center font-bold mb-4">
                Best Seller
            </h2>
            <ProductDetails/>

            <div className="container mx-auto">
                <h2 className="text-3xl text-center font-bold mb-4">
                    Top Wears for Women
                </h2>
                <ProductGrid products={placeholderProducts}/>
            </div>

            <FeaturedCollection/>
        </div>
    )

}

export default Home