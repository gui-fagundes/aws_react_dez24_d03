import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const response = await api.get(`OrderHistory/${userEmail}`);
      setHistory(response.data.history);
    };
    getHistory();
  }, []);
  return (
    <div className="flex flex-col justify-center gap-3 items-center max-w-full">
      {history.length > 0 ? (
        <div className="flex flex-col items-center self-start gap-3 max-w-full px-3">
          <h1 className="self-start mb-10">Orders</h1>
          {history.map((order) => (
            <div className="shadow-sm flex flex-nowrap items-center gap-10 justify-around max-w-155 h-20 px-2 font-inter" key={order.orderId}>
              <img
                src={order.productImg}
                alt="Product Image"
                className="h-12 w-10"
              />
              <div className="flex flex-col flex-nowrap gap-3">
                <h1 className="text-p1 font-medium text-bl-900" >{order.productTitle}</h1>
                <div className="md:flex gap-3 font-medium text-bl-500 text-l1 hidden">
                  <h1>Color: {order.productColor}</h1>
                  <h1>Size: {order.productSize}</h1>
                </div>
              </div>
              <div className="flex gap-8 items-center font-medium text-bl-500 text-l1">
                <h1 className="hidden md:flex" >Amount: {order.productQuantity}</h1>
                <h1 className="text-p1 font-medium text-bl-900">{`Order Total: $${order.productPrice}`}</h1>
                <Link
                  to={`/products/${order.productId}`}
                  className="h-12 w-20 border-1 border-bl-900 flex items-center justify-center rounded-md font-medium text-p1 text-bl-900"
                >
                  View Item
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <img src="/src/assets/Empty State.png" alt="" className="w-16 h-16" />
          <h1 className="font-inter text-bl-500 text-center">
            Your order history is waiting to be filled.
          </h1>
          <Link
            to={"/products"}
            className={
              "flex flex-row grow-0 flex-nowrap justify-center items-center font-medium text-P1 font-inter bg-bl-900 text-w-900 rounded-sm w-[183px] max-w-[183px] h-11 px-4 py-2"
            }
          >
            Start Shopping
            <img src="/src/icons/Arrow Right.png" alt="" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
