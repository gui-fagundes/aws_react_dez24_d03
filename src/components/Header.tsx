import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-32 flex flex-col items-center m-0 p-0 overflow-hidden">
      <div className="min-h-10 min-w-full bg-black text-white text-center pt-2">
        <h1>
          Get 25% OFF on your first order.{" "}
          <NavLink className={"underline"} to={"/products"}>
            Order Now
          </NavLink>
        </h1>
      </div>
      <div className="min-w-screen min-h-20 bg-white flex flex-row justify-around items-center px-5">
        <div className="flex flex-row gap-30">
          <NavLink to={"/"}>
            <div className="flex flex-row items-center cursor-pointer gap-3">
              <img src="/src/icons/logo/Logomark-black.png" alt="" />
              <h1 className="font-extrabold text-xl text-bl-900 font-inter">
                Outsider
              </h1>
            </div>
          </NavLink>
          <div className="flex flex-row items-center gap-5 font-inter text-bl-500">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/products"}>Shop</NavLink>
            <NavLink to={"/about"}>About</NavLink>
          </div>
        </div>

        <div className="flex flex-row gap-5">
          <NavLink to={"/cart"}>
            <img src="/src/icons/CartIcon.png" alt="" />
          </NavLink>
          <SignedOut>
            <NavLink to={"/login"}>
              <img src="/src/icons/User.png" alt="" />
            </NavLink>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Header;
