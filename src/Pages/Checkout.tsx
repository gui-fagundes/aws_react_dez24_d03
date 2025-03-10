import { Link } from "react-router-dom";
import BreadCrumbs from "../components/BreadCrumbs";
import {SignedIn, SignedOut} from "@clerk/clerk-react";

const Checkout = () => {
  return (
    <div className="flex flex-col w-screen">
      <BreadCrumbs currentPage="Checkout" />
      <div className="flex flex-col md:flex-row flex-wrap gap-3 px-40">
        <div className="flex flex-col gap-3 md:border-r-1 border-w-200 h-125 justify-center items-center pt-20 max-w-134 pr-10">
          <form
            action=""
            className="flex flex-row flex-wrap gap-4 text-bl-600 font-inter text-p1 font-medium"
          >
            <h1 className="font-inter font-semibold text-h5 text-bl-900">
              Shipping Address
            </h1>
            <div className="flex flex-col flex-nowrap w-134">
              <label htmlFor="streetAddress">Street Address</label>
              <input
                type="text"
                id="streetAddress"
                placeholder="Street Address"
                className="border-1 border-bl-100 rounded-md h-11"
              />
            </div>
            <div className="flex flex-col flex-nowrap w-65">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                placeholder="City"
                className="border-1 border-bl-100 rounded-md h-11"
              />
            </div>
            <div className="flex flex-col flex-nowrap w-65">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                placeholder="State"
                className="border-1 border-bl-100 rounded-md h-11"
              />
            </div>
            <div className="flex flex-col flex-nowrap w-65">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                placeholder="Zip Code"
                className="border-1 border-bl-100 rounded-md h-11"
              />
            </div>
            <div className="flex flex-col flex-nowrap w-65">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                placeholder="Country"
                className="border-1 border-bl-100 rounded-md h-11"
              />
            </div>
            <div className="flex flex-col flex-nowrap w-65">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="border-1 border-bl-100 rounded-md h-11"
              />
            </div>
            <div className="flex flex-col flex-nowrap w-65">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                className="border-1 border-bl-100 rounded-md h-11"
              />
            </div>
          </form>
        </div>
        <div className="max-w-93 h-126 flex flex-col gap-3 justify-around">
          <div className=" placeselfst">
            <h1>Your Order</h1>
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
                    "flex flex-row grow-0 flex-nowrap justify-center font-medium text-p1 font-inter bg-bl-900 text-w-900 rounded-sm w-93 h-11 place-content-center px-4 py-2"
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

export default Checkout;
