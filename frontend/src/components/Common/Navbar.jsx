import { Link } from "react-router-dom"
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi"
import { IoMdClose } from "react-icons/io"
import { HiBars3BottomRight } from "react-icons/hi2"
import SearchBar from "./SearchBar"
import CartDrawer from "../Layout/CartDrawer"
import { useState, useEffect } from "react"
import Logo from "../../assets/logo-max.png"

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [navDrawerOpen, setNavDrawerOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Hitung tinggi topbar (misal 36px) sebagai threshold
            setScrolled(window.scrollY > 36)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen)
    const toggleCartDrawer = () => setDrawerOpen(!drawerOpen)

    return (
        <>
            <nav className={`w-full z-40 transition-all duration-300 ${
                scrolled 
                    ? "fixed top-0 bg-white/95 backdrop-blur-sm shadow-sm py-2" 
                    : "relative bg-white border-b border-gray-100 py-3"
            }`}>
                <div className="container mx-auto flex items-center justify-between px-6">
                    {/* Left - Logo */}
                    <div>
                    <Link to="/" className="hover:opacity-80 transition-opacity duration-300">
                        <img 
                            src={Logo} 
                            alt="Maxsupply Logo" 
                            className="h-5 md:h-7 object-contain"
                            />
                         </Link>
                    </div>

                    {/* Center - menu */}
                    <div className="hidden md:flex space-x-8">
                    <Link 
                            to="/" 
                            className="text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-red-600 transition-colors relative group"
                        >
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link 
                            to="/shop" 
                            className="text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-red-600 transition-colors relative group"
                        >
                            Pemesanan
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link 
                            to="#" 
                            className="text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-red-600 transition-colors relative group"
                        >
                            Katalog
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link 
                            to="#" 
                            className="text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-red-600 transition-colors relative group"
                        >
                            Tentang Kami
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        
                    </div>

                    {/* right - icons */}
                    <div className="flex items-center space-x-5">
                        <Link to="/profile" className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                            <HiOutlineUser className="h-5 w-5 text-gray-600 hover:text-red-600"/>
                        </Link>

                        <button onClick={toggleCartDrawer} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors relative">
                            <HiOutlineShoppingBag className="h-5 w-5 text-gray-600 hover:text-red-600"/>
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                4
                            </span>
                        </button>

                        <div className="hidden sm:block">
                            <SearchBar/>
                        </div>

                        <button onClick={toggleNavDrawer} className="md:hidden p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                            <HiBars3BottomRight className="h-6 w-6 text-gray-600 hover:text-red-600"/>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Nav */}
            <div className={`fixed inset-0 z-50 transform transition-all duration-300 ease-in-out ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div 
                    className={`absolute inset-0 bg-black/20 ${navDrawerOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
                    onClick={toggleNavDrawer}
                ></div>
                <div className="relative w-4/5 max-w-sm h-full bg-white shadow-xl">
                    <div className="flex justify-between items-center p-5 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900">Menu</h3>
                        <button 
                            onClick={toggleNavDrawer}
                            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <IoMdClose className="w-6 h-6 text-gray-500 hover:text-red-600"/>
                        </button>
                    </div>
                    
                    <nav className="p-5 space-y-3">
                        <Link to="/shop" onClick={toggleNavDrawer} className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-medium">
                        Home
                        </Link>
                        <Link to="#" onClick={toggleNavDrawer} className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-medium">
                        Pemesanan
                        </Link>
                        <Link to="#" onClick={toggleNavDrawer} className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-medium">
                        Katalog
                        </Link>
                        <Link to="#" onClick={toggleNavDrawer} className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-medium">
                        Tentang Kami
                        </Link>
                    </nav>
                </div>
            </div>

            <CartDrawer drawerOpen={drawerOpen} toogleCartDrawer={toggleCartDrawer}/>
        </>
    )
}

export default Navbar