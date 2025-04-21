import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ drawerOpen, toogleCartDrawer }) => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate("/checkout");
    };

    return (
        <div className={`fixed inset-0 z-50 transition-all duration-300 ${drawerOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
            {/* Backdrop blur */}
            <div
                className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={toogleCartDrawer}
            />

            {/* Cart drawer */}
            <div
                className={`absolute right-0 top-0 h-full w-full sm:w-[30rem] bg-white shadow-2xl transition-transform duration-300 transform ${
                    drawerOpen ? 'translate-x-0' : 'translate-x-full'
                } flex flex-col`}
            >
                {/* Close button */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                    <button onClick={toogleCartDrawer} className="hover:text-red-600 transition">
                        <IoMdClose className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                {/* Cart content */}
                <div className="flex-grow p-4 overflow-y-auto custom-scroll">
                    <CartContent />
                </div>

                {/* Checkout button */}
                <div className="p-4 border-t bg-white">
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-lg font-semibold shadow hover:opacity-90 transition"
                    >
                        Proceed to Checkout
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                        Shipping, taxes, and discounts calculated at checkout.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
