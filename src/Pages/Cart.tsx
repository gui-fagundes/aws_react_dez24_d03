import BreadCrumbs from "../components/BreadCrumbs";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { CartSlice } from "../store/cart/cartSlice";
import { useEffect, useState } from "react";

const Cart = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.cart.items);
  const orderSubTotal = useAppSelector((state) => state.cart.subTotal)
  const [tax, setTaxes] = useState((orderSubTotal*0.05))


  useEffect(() => {
    setTaxes((orderSubTotal*0.05))
    return
  }, [orderSubTotal]);
  
  

  return (
    <div className="flex flex-col gap-3 w-screen">
      <BreadCrumbs currentPage="Cart" />
      <div className="flex flex-row flex-wrap w-screen justify-around gap-3">
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
                <img
                  src={item.imagesUrl[0]}
                  alt={item.title}
                  className="w-14 h-14 object-cover"
                />
                <span className="text-xl">{item.title}</span>
                <span className="text-xl">{item.color}</span>
                <span className="text-xl">{item.size}</span>
                <span className="text-xl">$ {item.price}</span>
                <div className="flex items-center justify-between gap-8 border border-gray-300">
                  <button
                    onClick={() =>
                      dispatch(CartSlice.actions.decrementQuantity(item.id))
                    }
                    className="h-10 w-10 flex justify-center items-center  cursor-pointer"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(CartSlice.actions.incrementQuantity(item.id))
                    }
                    className="h-10 w-10 flex justify-center items-center  cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() =>
                    dispatch(CartSlice.actions.removeFromCart(item.id))
                  }
                  className="h-10 w-10 flex justify-center items-center bg-gray-100 cursor-pointer"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-85 h-107 border-1 border-bl-100 m-10 flex flex-col justify-around px-4">
          <div className="">
            <h1>Order Summary</h1>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">Edit Cart</div>
            <div className="flex flex-row justify-between">
              <h1>Subtotal</h1>
              <h1>{`R$ ${orderSubTotal.toFixed(2)}`}</h1></div>
            <div className="flex flex-row justify-between">
              <h1>Shipping</h1>
              <h1>Free</h1>
            </div>
            <div className="flex flex-row justify-between"><h1>Tax</h1>
            <h1>{`R$ ${tax.toFixed(2)}`}</h1></div>
            <hr />
            <div className="flex flex-row justify-between"><h1>Total</h1>
            <h1>{`R$ ${(tax + orderSubTotal).toFixed(2)}`}</h1></div>
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
