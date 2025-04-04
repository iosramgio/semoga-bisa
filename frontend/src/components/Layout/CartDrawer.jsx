
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({drawerOpen, toogleCartDrawer}) => {


        const navigate = useNavigate()
        const handleCheckout = () => {
            navigate("/checkout")
        }

    return(
        <div className={`fixed top-0 right-0 w-3/4 sm:w-3/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        
        {/*CLOSE BUTTON */}
            <div className="flex justify-end p-4">
                <button onClick={toogleCartDrawer}>
                    <IoMdClose className="h-6 w-6 text-gray-600"/>
                </button>
            </div>
            {/* Cart contnts eoth scrollabel area */}
            <div className="flex-grow p-4 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                <CartContent/>
            </div>

            {/* Checkout button fixed at the bottom*/}
            <div className="p-4 bg-white sticky bottom-0">
                <button onClick={handleCheckout} className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-maxx-red transition">
                    Checkout
                </button>
                <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
                    Shiping, taxes, adn discount codes calculated at  Checkout
                </p>
            </div>
        </div>
    )
}
export default CartDrawer