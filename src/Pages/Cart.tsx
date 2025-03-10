import BreadCrumbs from "../components/BreadCrumbs";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <div className="flex flex-col gap-3 w-screen">
      <BreadCrumbs currentPage="Cart" />
      <div className="flex flex-row flex-wrap w-screen justify-around gap-3">
        <div className="flex flex-col gap-3">
          <div className="border-b-1 border-bl-100 w-157 mt-10 py-4">
            <h1 className="font-inter font-semibold text-h5 text-bl-900">Your Cart</h1>
          </div>
          <div className="flex flex-col gap-3">Cart Content</div>
        </div>
        <div className="w-85 h-107 border-1 border-bl-100 m-10 flex flex-col justify-around px-4">
          <div>
            <h1>Order Summary</h1>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">Edit Cart</div>
            <div className="flex flex-row justify-between">Subtotal</div>
            <div className="flex flex-row justify-between">Shipping</div>
            <div className="flex flex-row justify-between">Tax</div>
            <hr />
            <div className="flex flex-row justify-between">Total</div>
            <div>
              <SignedIn>
                <Link
                  to={"/sucessfullOrder"}
                  className={
                    "flex flex-row grow-0 flex-nowrap justify-center font-medium text-p1 font-inter bg-bl-900 text-w-900 rounded-sm w-93 h-11 place-content-center px-4 py-2"
                  }
                >
                  Place Order
                </Link>
              </SignedIn>
              <SignedOut>
                <Link
                  to={"/login"}
                  className={
                    "flex flex-row flex-nowrap justify-center font-medium text-p1 font-inter bg-bl-900 text-w-900 rounded-sm h-11 place-content-center px-4 py-2"
                  }
                >
                  Log in to Place Order
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
