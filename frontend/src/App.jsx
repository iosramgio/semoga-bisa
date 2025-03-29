import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout"
import Home from "./pages/Home"
import {Toaster} from "sonner"
import Login from "./pages/Login"
import Register from "./pages/Register"

const App = () => {
  return(
    <BrowserRouter future={{ v7_startTransition : true}}>
    <Toaster position="top-right"/>
    <Routes>
      <Route path="/" element={<UserLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>
      <Route>{/*admin layout */}</Route>
    </Routes>
    </BrowserRouter>
  )
}
export default App