import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store";

const Header = () => {
  const {user} = useUser()
  const userImage = user?.imageUrl
  const count = useAppSelector((state) => state.cart.count);
  return (
    <div className="h-32 flex flex-col items-center m-0 p-0 overflow-hidden fixed z-100">
      <div className="min-h-10 min-w-full bg-black text-white text-center pt-2">
        <h1>
          Get 25% OFF on your first order.{" "}
          <NavLink className={"underline"} to={"/products"}>
            Order Now
          </NavLink>
        </h1>
      </div>
      <div className="min-w-screen min-h-20 bg-white flex flex-row justify-around items-center">
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
            <NavLink to={"/"} className={"hidden md:flex"}>Home</NavLink>
            <NavLink to={"/products"}>Shop</NavLink>
            <NavLink to={"/about"} className={"hidden md:flex"}>About</NavLink>
          </div>
        </div>

        <div className="flex flex-row gap-5">
          <NavLink to={"/cart"}>
            <button className="cursor-pointer relative">
              <img src="/src/icons/CartIcon.png" alt="" />
              {count > 0 && (
                <span className="bg-red-600 text-w-900 text-xs font-inter absolute rounded-full flex items-center justify-center -bottom-2 -right-2 w-4 h-4">
                  {count}
                </span>
              )}
            </button>
          </NavLink>
          <SignedOut>
            <NavLink to={"/login"}>
              <img src="/src/icons/User.png" alt="" />
            </NavLink>
          </SignedOut>
          <SignedIn>
            <NavLink to={"myaccount"}>
          <img
            src={userImage}
            alt="userImage"
            className="rounded-full max-w-6 max-h-6 border-1 border-bl-800"
          />
            </NavLink>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Header;
