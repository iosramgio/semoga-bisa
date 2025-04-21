import { useEffect, useState, useRef} from "react";
import { FaFilter } from "react-icons/fa6";
import FilterSideBar from "./FilterSideBar";
import SortOption from "./SortOptions";
import ProductGrid from "../components/Product/ProductGrid"

const Shop = () => {
    const [products, setProducts] = useState([]);
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const handleClickOutsite = (e) => {
        // close sidebar if clicked outsite
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsite);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsite);
        };
    }, []); // Dependency array kosong agar hanya dijalankan saat mount/unmount
    

    useEffect(() => {
        setTimeout(() => {
            const fetchedProducts = [
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
                    _id: 5,
                    name: "Product 5",
                    price: 100,
                    images: [{ url: "https://picsum.photos/500/500?random=6", altText: "Product 5" }]
                },
                {
                    _id: 6,
                    name: "Product 6",
                    price: 150,
                    images: [{ url: "https://picsum.photos/500/500?random=7", altText: "Product 6" }]
                },
                {
                    _id: 7,
                    name: "Product 7",
                    price: 200,
                    images: [{ url: "https://picsum.photos/500/500?random=8", altText: "Product 7" }]
                },
                {
                    _id: 8,
                    name: "Product 8",
                    price: 250,
                    images: [{ url: "https://picsum.photos/500/500?random=9", altText: "Product 8" }]
                }
            ];
            setProducts(fetchedProducts);
        }, 1000);
    }, []);

    return (
        <div className="flex flex-col lg:flex-row">
            {/* mobile filter button */}
            <button onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center">
                <FaFilter className="mr-2"/> Filters
            </button>

            {/* sidebar filter */}
            <div 
            ref={sidebarRef} 
            className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
                <FilterSideBar/>
            </div>

            <div className="flex-grow p-4">
                <h2 className="text-2xl uppercase mb-4">All Collection</h2>

                {/* dort option */}
                <SortOption/>

                {/* product grid */}
                <ProductGrid products={products}/>
            </div>
        </div>
    );
};

export default Shop;
