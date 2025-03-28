import Topbar from "../Layout/Topbar"
import Navbar from "./Navbar"

const Header = () => {
    return(
        <header className="border-b border-gray-400">
            {/*Topbar */}
            <Topbar/>
            {/*navbar */}
           <Navbar/>
            {/*Topbar */}
        </header>
    )
  }
  export default Header