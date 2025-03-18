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
import Page404 from "./Pages/Page404";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <>
            <SignedOut></SignedOut>
            <Login />
          </>
        }
      />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route
        path="/register"
        element={
          <>
            <SignedOut>
              <Register />
            </SignedOut>
          </>
        }
      />
      <Route
        path="/recover"
        element={
          <>
            <SignedOut>
              <PasswordReset />
            </SignedOut>
          </>
        }
      />
      <Route
        path="/myaccount"
        element={
          <>
            <SignedIn>
              <UserAccount />
            </SignedIn>
            <SignedOut>
              <Page403 />
            </SignedOut>
          </>
        }
      />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/checkout"
        element={
          <>
            <SignedIn>
              <Checkout />
            </SignedIn>
            <SignedOut>
              <Page403 />
            </SignedOut>
          </>
        }
      />
      <Route
        path="/sucessfullOrder"
        element={
          <>
            <SignedIn>
              <SucessfullOrder />
            </SignedIn>
            <SignedOut>
              <Page403 />
            </SignedOut>
          </>
        }
      />
      <Route path="/about" element={<About />} />

      <Route path="/403" element={<Page403 />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
