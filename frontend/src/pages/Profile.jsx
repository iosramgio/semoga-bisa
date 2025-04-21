import { FaSignOutAlt } from "react-icons/fa";
import MyOrderPage from "./MyOrderPage";

const Profile = () => {
    return (
        <div className="flex-grow container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-2xl shadow-md p-6">
                    <div className="text-center">
                        <h1 className="text-xl font-bold text-gray-800">John Deo</h1>
                        <p className="text-sm text-gray-500 mt-1 mb-6">johndeo@gmail.com</p>
                        <button className="flex items-center justify-center w-full gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition shadow-md">
                            <FaSignOutAlt />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-full md:w-2/3 lg:w-3/4 bg-white rounded-2xl shadow-md p-6">
                    <MyOrderPage />
                </div>
            </div>
        </div>
    );
};

export default Profile;
