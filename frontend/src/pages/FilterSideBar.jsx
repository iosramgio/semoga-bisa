import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSideBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        category: "",
        gender: "",
        color: "",
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 100,
    });

    const categories = ["Top Wear", "Bottom Wear"];
    const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const materials = ["Cotton", "Wool", "Denim", "Polyester", "Silk", "Linen", "Viscose", "Fleece"];
    const brands = ["Nike", "Adidas", "Puma", "Reebok"];
    const genders = ["Men", "Women"];

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        setFilters({
            category: params.category || "",
            gender: params.gender || "",
            color: params.color || "",
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: Number(params.minPrice) || 0,
            maxPrice: Number(params.maxPrice) || 100,
        });
    }, [searchParams]);

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        let newFilters = { ...filters };

        if (type === "checkbox") {
            if (checked) {
                newFilters[name] = [...(newFilters[name] || []), value];
            } else {
                newFilters[name] = newFilters[name].filter((item) => item !== value);
            }
        } else {
            newFilters[name] = value;
        }

        setFilters(newFilters);
        updateURLParams(newFilters);
    };

    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        const newFilters = { ...filters, maxPrice: newPrice };
        setFilters(newFilters);
        updateURLParams(newFilters);
    };

    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();
        Object.keys(newFilters).forEach((key) => {
            if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
                params.append(key, newFilters[key].join(","));
            } else if (newFilters[key]) {
                params.append(key, newFilters[key]);
            }
        });
        setSearchParams(params);
    };


    return (
        <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

            {/* Category Filter */}
            <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Category</label>
                {categories.map((category) => (
                    <div key={category} className="flex items-center mb-1">
                        <input 
                            type="radio" 
                            name="category"
                            value={category}
                            checked={filters.category === category}
                            onChange={handleFilterChange} 
                            className="mr-2 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                        />
                        <span className="text-gray-700">{category}</span>
                    </div>
                ))}
            </div>

            {/* Gender Filter */}
            <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Gender</label>
                {genders.map((gender) => (
                    <div key={gender} className="flex items-center mb-1">
                        <input 
                            type="radio" 
                            name="gender" 
                            value={gender}
                            checked={filters.gender === gender}
                            onChange={handleFilterChange} 
                            className="mr-2 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                        />
                        <span className="text-gray-700">{gender}</span>
                    </div>
                ))}
            </div>

            {/* Color Filter */}
            <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <button
                            key={color}
                            name="color"
                            value={color}
                            onClick={() => setFilters((prev) => ({ ...prev, color }))}
                            className={`w-8 h-8 rounded-full border border-gray-300 transition hover:scale-105 ${filters.color === color ? "ring-2 ring-blue-500" : ""}`}
                            style={{ backgroundColor: color.toLowerCase() }}
                        ></button>
                    ))}
                </div>
            </div>

            {/* Size Filter */}
            <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Size</label>
                {sizes.map((size) => (
                    <div key={size} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            name="size"
                            value={size}
                            checked={filters.size.includes(size)}
                            onChange={handleFilterChange}
                            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                        />
                        <span className="text-gray-700">{size}</span>
                    </div>
                ))}
            </div>

            {/* Material Filter */}
            <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Material</label>
                {materials.map((material) => (
                    <div key={material} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            name="material"
                            value={material}
                            checked={filters.material.includes(material)}
                            onChange={handleFilterChange}
                            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                        />
                        <span className="text-gray-700">{material}</span>
                    </div>
                ))}
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Brand</label>
                {brands.map((brand) => (
                    <div key={brand} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            name="brand"
                            value={brand}
                            checked={filters.brand.includes(brand)}
                            onChange={handleFilterChange}
                            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                        />
                        <span className="text-gray-700">{brand}</span>
                    </div>
                ))}
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Price Range</label>
                <input
                    type="range"
                    name="maxPrice"
                    min={0}
                    max={100}
                    value={filters.maxPrice}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-gray-600 mt-2">
                    <span>Rp. 0</span>
                    <span>Rp. {filters.maxPrice}</span>
                </div>
            </div>
        </div>
    );
};

export default FilterSideBar;
