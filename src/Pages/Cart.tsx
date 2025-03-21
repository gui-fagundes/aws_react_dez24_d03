import BreadCrumbs from "../components/BreadCrumbs";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { CartSlice } from "../store/cart/cartSlice";
import { useEffect, useState } from "react";
import api from "../services/api";

const Cart = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.cart.items);
  const orderSubTotal = useAppSelector((state) => state.cart.subTotal);
  const [tax, setTaxes] = useState(orderSubTotal * 0.05);

  useEffect(() => {
    setTaxes(orderSubTotal * 0.05);
    return;
  }, [orderSubTotal]);




  const getColor = (color: string) => {
    switch (color) {
      case "black":
        return "bg-bl-800";

      case "yellow":
        return "bg-y-800";

      case "blue":
        return "bg-b-800";

      case "red":
        return "bg-r-800";

      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-screen">
      <BreadCrumbs currentPage="Cart" />
      <div className="flex flex-row flex-wrap max-w-screen justify-center gap-3">
        <div className="flex flex-col gap-3">
          <div className="border-b-1 border-bl-100 w-157 mt-10 py-4">
            <h1 className="font-inter font-semibold text-h5 text-bl-900">
              Your Cart
            </h1>
          </div>
          <div className="flex flex-col gap-3">
            {products?.map((item) => (
              <div
                className="flex w-full items-center justify-between"
                key={item.id}
              >
                <div className="flex flex-nowrap gap-3">
                  <img
                    src={item.imagesUrl[0]}
                    alt={item.title}
                    className="w-14 h-14 object-fit"
                  />
                  <div className="flex flex-col gap-3">
                    <span className="font-inter text-p1 text-bl-900 font-medium">
                      {item.title}
                    </span>
                    <div className="flex gap-3 h-6 items-center justify-baseline">
                      <h1 className="font-inter text-l1 text-bl-500 font-medium">
                        Color:
                      </h1>
                      <div
                        className={`rounded-full h-3 w-3 ${getColor(
                          item.color
                        )}`}
                      ></div>
                      <hr className="text-bl-500 w-3"></hr>
                      <span className="font-inter text-l1 text-bl-500 font-medium">
                        Size : {item.size}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-nowrap">
                  <div className="font-inter text-p1 text-bl-900 font-medium w-12 items-center">{`$${item.price}`}</div>
                  <div className="flex items-center justify-evenly gap-5 border-1 border-bl-100 rounded-md max-w-27 w-full">
                    <button
                      onClick={() =>
                        dispatch(CartSlice.actions.decrementQuantity(item.id))
                      }
                      className="h-10 w-20 flex justify-center items-center  cursor-pointer"
                    >
                      <img src="/src/icons/Minus.png" alt=""/>
                    </button>
                    <span className="w-fit font-inter font-medium text-p1 text-bl-800">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(CartSlice.actions.incrementQuantity(item.id))
                      }
                      className="h-10 w-20 flex justify-center items-center  cursor-pointer"
                    >
                      <img src="/src/icons/Add.png" alt="" />
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      dispatch(CartSlice.actions.removeFromCart(item.id))
                    }
                    className="h-10 w-10 flex justify-center items-center bg-w-100 rounded-md cursor-pointer"
                  >
                    <img src="/src/icons/X.svg" alt="" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-85 max-h-107 border-1 border-bl-100 rounded-md m-10 flex flex-col justify-evenly px-4 py-10 gap-3">
          <div className="font-inter font-normal text-h5 text-bl-900 h-15">
            <h1>Order Summary</h1>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <h1 className="font-inter text-bl-500">Subtotal</h1>
              <h1 className="font-inter text-p1 text-bl-900">{`$ ${orderSubTotal.toFixed(2)}`}</h1>
            </div>
            <div className="flex flex-row justify-between">
              <h1 className="font-inter text-bl-500">Shipping</h1>
              <h1 className="font-inter text-p1 text-bl-900">Free</h1>
            </div>
            <div className="flex flex-row justify-between">
              <h1 className="font-inter text-bl-500">Tax</h1>
              <h1 className="font-inter text-p1 text-bl-900">{`$ ${tax.toFixed(2)}`}</h1>
            </div>
            <hr className="text-bl-100 w-full"></hr>
            <div className="flex flex-row justify-between">
              <h1 className="font-inter text-p1 text-bl-900">Total</h1>
              <h1 className="font-inter text-h6 text-bl-900">{`$ ${(tax + orderSubTotal).toFixed(2)}`}</h1>
            </div>
            <div>
              <SignedIn>
                <Link
                  to={"/checkout"}
                  className={
                    "flex flex-row flex-nowrap justify-center items-center font-medium text-p1 font-inter bg-bl-900 text-w-900 rounded-sm h-11 px-4 py-2"
                  }
                >
                  Place Order
                </Link>
              </SignedIn>
              <SignedOut>
                <Link
                  to={"/login"}
                  className={
                    "flex flex-row flex-nowrap justify-center items-center font-medium text-p1 font-inter bg-bl-900 text-w-900 rounded-sm h-11 px-4 py-2"
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
