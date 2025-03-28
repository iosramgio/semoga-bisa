import { useState } from "react";
import { HiMagnifyingGlass,HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {

const [searcTerm, setSearchTerm] = useState("")
const [isOpen, setIsOpen] = useState(false)

const handleSearchToggle = () => {
    setIsOpen(!isOpen)
}

    const handleSearch = (e) => {
        e.preventDefault()
        console.log("Search Term:", searcTerm)
        setIsOpen(false)
    }

    return (
        <div className={`flex items-center justify-center transition-all duration-200 ${isOpen ? "fixed border-b border-black top-0 left-0 w-screen bg-maxx-white h-24 z-50" : "w-auto"}`}>


    {isOpen ? (
        <form onSubmit={handleSearch} className="relative flex items-center justify-center w-full">
            <div className="relative w-1/2">
                <input 
                type="text" 
                placeholder="Seacrch" 
                value={searcTerm} 
                onChange={(e) =>setSearchTerm(e.target.value)}
                className="bg-white border hover:border-red-600 text-black px-4 py-2 pr-12 rounded-lg focus:outline-none w-full">
                </input>
                {/*Search icons */}
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 transition">
                <HiMagnifyingGlass className="h-6 w-6"/>
                </button>
            </div>

            {/*close button */}
            <button type="button" onClick={handleSearchToggle} className="absolute right-4 top-1/4 transform -translate-y-1/2 text-gray-500 hover:text-red-600 transition">
            <HiMiniXMark className="h-6 w-6"/>
            </button>
        </form>
    ) : (
        <button onClick={handleSearchToggle}>
            <HiMagnifyingGlass className="h-6 w-6"/>
        </button>
    )}
    </div>
    )
}

export default SearchBar