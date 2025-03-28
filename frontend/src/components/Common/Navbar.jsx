import { Link } from "react-router-dom"
import { HiOutlineShoppingBag,HiOutlineUser } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react"

const Navbar =() =>{

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [navDrawerOpen, setNavDrawerOpen] = useState(false)

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen)
    }

    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    return(
        <>
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">

            {/*Left - Logo */}
            <div>
                <Link to="/" className="text-2xl font-medium">
                maxx
                </Link>
            </div>

            {/*Center - menu */}
            <div className="hidden md:flex space-x-6">
                <Link to="#" className="text-gray-800 hover:text-red-600 text-sm font-medium uppercase">
                Men</Link>
                <Link to="#" className="text-gray-800 hover:text-red-600 text-sm font-medium uppercase">
                Women</Link>
                <Link to="#" className="text-gray-800 hover:text-red-600 text-sm font-medium uppercase">
                Top Wear</Link>
                <Link to="#" className="text-gray-800 hover:text-red-600 text-sm font-medium uppercase">
                Bottom wear</Link>
            </div>

            {/*right - icons */}
            <div className="flex items-center space-x-4">
                <Link to ="/profile" className="hover:text-maxx-black">
                    <HiOutlineUser className="h-6 w-6 text-gray-700 hover:text-red-600 transition"/>
                </Link>

                <button onClick={toggleCartDrawer} className="relative hover:text-maxx-black">
                    <HiOutlineShoppingBag className="h-6 w-6 text-gray-700 hover:text-red-600 transition"/>
                <span className="absolute -top-1 bg-red-600 hover:bg-red text-white text-xs rounded-full px-2 py-0.5">
                    4
                </span>
                </button>

                {/*Search*/}
                <div className="overflow-hidden hover:text-red-600 transition">
                    <SearchBar/>
                </div>

                <button onClick={toggleNavDrawer} className="md:hidden">
                    <HiBars3BottomRight className="h-6 w-6 text-gray-700 hover:hover:text-red-600"/>
                </button>
            </div>
        </nav>
        <CartDrawer drawerOpen={drawerOpen} toogleCartDrawer={toggleCartDrawer}/>

        {/* Mobile Nav */}
        <div className={`fixed top-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
           navDrawerOpen ? "translate-x-0" : "-translate-x-full" 
        }`}>
            <div className="flex justify-end p-4">
                <button onClick={toggleNavDrawer}>
                    <IoMdClose className="w-6 h-6 text-gray-600 hover:text-red-600 transition"/>
                </button>
            </div>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Menu</h2>
                <nav className="space-y-4">
                    <Link to="#" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-red-600 transition">
                        Men
                    </Link>
                    <Link to="#" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-red-600 transition">
                        Women
                    </Link>
                    <Link to="#" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-red-600 transition">
                        Top Wear
                    </Link>
                    <Link to="#" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-red-600 transition">
                        button Wear
                    </Link>
                </nav>
            </div>
        </div>
        </>
    )
}
export default Navbar