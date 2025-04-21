import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

const Header = () => {
  return(
    <header className="border-b border-gray-200">
      {/* Topbar (non-sticky) */}
      <Topbar />
      
      {/* Navbar (akan dibuat sticky di komponen Navbar sendiri) */}
      <Navbar />
    </header>
  )
}
export default Header;