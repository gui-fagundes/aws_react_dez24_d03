import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Products from "./Pages/Products";
import Register from "./Pages/Register";
import PasswordReset from "./Pages/PasswordReset";
import UserAccount from "./Pages/UserAccount";
import SucessfullOrder from "./Pages/SucessfullOrder";
import Checkout from "./Pages/Checkout";

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<PasswordReset />} />
      <Route path="myaccount" element={<UserAccount />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="sucessfullOrder" element={<SucessfullOrder />} />

    </Routes>
  );
};
