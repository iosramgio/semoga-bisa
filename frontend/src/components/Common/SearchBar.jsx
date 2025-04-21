import { useState } from "react";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
    setSearchTerm(""); // Reset search term when closing
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm);
    // Handle search logic here
  };

  return (
    <div className="relative">
      {/* Search Toggle Button */}
      <button
        onClick={handleSearchToggle}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Search"
      >
        <HiMagnifyingGlass className="h-5 w-5 text-gray-600 hover:text-red-600" />
      </button>

      {/* Search Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleSearchToggle}
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              className="bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="container mx-auto px-4 py-4">
                <div className="relative max-w-2xl mx-auto">
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                      className="w-full py-4 px-6 pr-16 text-lg border-0 border-b-2 border-gray-200 focus:border-red-600 focus:ring-0 outline-none"
                    />
                    
                    <div className="absolute right-0 top-0 h-full flex items-center space-x-2">
                      <button
                        type="submit"
                        className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                        aria-label="Submit search"
                      >
                        <HiMagnifyingGlass className="h-6 w-6" />
                      </button>
                      <button
                        type="button"
                        onClick={handleSearchToggle}
                        className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                        aria-label="Close search"
                      >
                        <HiXMark className="h-6 w-6" />
                      </button>
                    </div>
                  </form>
                  
                  {/* Recent Searches (optional) */}
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Popular: T-Shirts, Jeans, Jackets</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;