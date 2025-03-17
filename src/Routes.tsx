import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProductDetail from "./Pages/ProductDetail";
import Register from "./Pages/Register";
import PasswordReset from "./Pages/PasswordReset";
import UserAccount from "./Pages/UserAccount";
import SucessfullOrder from "./Pages/SucessfullOrder";
import Checkout from "./Pages/Checkout";
import Cart from "./Pages/Cart";
import Page403 from "./Pages/Page403";
import ProductList from "./Pages/ProductList";
import About from "./Pages/About";

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<PasswordReset />} />
      <Route path="/myaccount" element={<UserAccount />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/sucessfullOrder" element={<SucessfullOrder />} />
      <Route path="/about" element = {<About />} />
      
      <Route path="/403" element={<Page403 />} />
    </Routes>
  );
};
