import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const FilterSideBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
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

    const sectionVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="p-6 rounded-2xl bg-white shadow-lg"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
        >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Filter</h3>

            {/* Helper Render Function */}
            {[
                {
                    label: "Category",
                    type: "radio",
                    options: categories,
                    name: "category",
                    value: filters.category
                },
                {
                    label: "Gender",
                    type: "radio",
                    options: genders,
                    name: "gender",
                    value: filters.gender
                },
                {
                    label: "Size",
                    type: "checkbox",
                    options: sizes,
                    name: "size",
                    value: filters.size
                },
                {
                    label: "Material",
                    type: "checkbox",
                    options: materials,
                    name: "material",
                    value: filters.material
                },
                {
                    label: "Brand",
                    type: "checkbox",
                    options: brands,
                    name: "brand",
                    value: filters.brand
                }
            ].map((section, idx) => (
                <motion.div key={section.label} variants={sectionVariant} className="mb-6">
                    <label className="block text-gray-600 font-semibold mb-2">{section.label}</label>
                    {section.options.map((option) => (
                        <div key={option} className="flex items-center mb-1">
                            <input
                                type={section.type}
                                name={section.name}
                                value={option}
                                checked={
                                    section.type === "radio"
                                        ? section.value === option
                                        : section.value.includes(option)
                                }
                                onChange={handleFilterChange}
                                className="mr-2 h-4 w-4 text-blue-600 accent-blue-500"
                            />
                            <span className="text-gray-700">{option}</span>
                        </div>
                    ))}
                </motion.div>
            ))}

            {/* Color Filter */}
            <motion.div className="mb-6" variants={sectionVariant}>
                <label className="block text-gray-600 font-semibold mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <button
                            key={color}
                            name="color"
                            value={color}
                            onClick={() => setFilters((prev) => ({ ...prev, color }))}
                            className={`w-8 h-8 rounded-full transition-all border-2 duration-300 ${filters.color === color
                                ? "border-blue-500 scale-110"
                                : "border-gray-300"
                                }`}
                            style={{ backgroundColor: color.toLowerCase() }}
                        ></button>
                    ))}
                </div>
            </motion.div>

            {/* Price Range */}
            <motion.div className="mb-6" variants={sectionVariant}>
                <label className="block text-gray-600 font-semibold mb-2">Price Range</label>
                <input
                    type="range"
                    name="maxPrice"
                    min={0}
                    max={100}
                    value={filters.maxPrice}
                    onChange={handlePriceChange}
                    className="w-full h-2 rounded-lg appearance-none bg-gradient-to-r from-red-700 to-pink-600"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Rp. 0</span>
                    <span>Rp. {filters.maxPrice}</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FilterSideBar;
