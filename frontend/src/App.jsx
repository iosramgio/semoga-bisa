import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout"
import Home from "./pages/Home"
import {Toaster} from "sonner"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import CollectionPage from "./pages/CollectionPage"
import ProductDetails from "./components/Product/ProductDetails"
import Checkout from "./components/Cart/Checkout"
import AdminLayout from "./components/admin/AdminLayout"
import AdminHomePage from "./components/admin/AdminHomePage"
import UserManagement from "./components/admin/UserManagement"
import ProductManagement from "./components/admin/ProductManagement"
import EditProductPage from "./components/admin/EditProductPage"
import OrderManagement from "./components/admin/OrderManagement"

const App = () => {
  return(
    <BrowserRouter future={{ v7_startTransition : true}}>
    <Toaster position="top-right"/>
    <Routes>
      <Route path="/" element={<UserLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="collections/:collection" element={<CollectionPage/>}/>
        <Route path="product/:id" element={<ProductDetails/>}/>
        <Route path="checkout" element={<Checkout/>}/>
      </Route>
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<AdminHomePage/>}/>
        <Route path="users" element={<UserManagement/>}/>
        <Route path="products" element={<ProductManagement/>}/>
        <Route path="products/:id/edit" element={<EditProductPage/>}/>
        <Route path="orders" element={<OrderManagement/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
export default App