import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout"
import Home from "./pages/Home"
import {Toaster} from "sonner"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import ProductDetails from "./components/Product/ProductDetails"
import Shop from "./pages/Shop"
import Checkout from "./components/Cart/Checkout"
import AdminLayout from "./components/admin/AdminLayout"
import AdminHomePage from "./components/admin/AdminHomePage"
import UserManagement from "./components/admin/UserManagement"
import ProductManagement from "./components/admin/ProductManagement"
import EditProductPage from "./components/admin/EditProductPage"
import OrderManagement from "./components/admin/OrderManagement"

import {Provider} from "react-redux"
import store from "./redux/store"

const App = () => {
  return(
    <Provider store={store}>
    <BrowserRouter future={{ v7_startTransition : true}}>
    <Toaster position="top-right"/>
    <Routes>
      <Route path="/" element={<UserLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="product/:id" element={<ProductDetails/>}/>
        <Route path="shop" element={<Shop/>}/>
        <Route path="checkout" element={<Checkout/>}/>
      </Route>
      <Route>
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<AdminHomePage/>}/>
        <Route path="users" element={<UserManagement/>}/>
        <Route path="products" element={<ProductManagement/>}/>
        <Route path="products/:id/edit" element={<EditProductPage/>}/>
        <Route path="orders" element={<OrderManagement/>}/>
      </Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}
export default App