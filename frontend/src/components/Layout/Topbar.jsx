import { IoLogoWhatsapp } from "react-icons/io5";
import {IoLogoInstagram} from "react-icons/io"
import { SiGooglemaps } from "react-icons/si";

const Topbar = () => {
    return(
      <div className="bg-maxx-red text-white">
        <div className="container mx-auto flex justify-between items-center py-2">
            <div className="hidden md:flex items-center space-x-2x`">
                <a href="#" className="hover:text-gray-300">
                    <IoLogoWhatsapp className="h-5 w-5"/>
                </a>
                <a href="#" className="hover:text-gray-300">
                    <IoLogoInstagram className="h-5 w-5"/>
                </a>
                <a href="#" className="hover:text-gray-300">
                    <SiGooglemaps className="h-5 w-5"/>
                </a>
            </div>
            <div className="text-sm text-center flex-grow">
                <span>Based in Indonesia - Quality clothing convection</span>
            </div>
            <div className="text-sm hidden md:block">
                <a href="https://api.whatsapp.com/send?phone=089602865414" className="hover:text-gray-300">
                    +62 8214606269 (Chat Only)
                </a>
            </div>
        </div>
      </div>
      
    )
  }
  export default Topbar