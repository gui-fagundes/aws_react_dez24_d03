import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react"
import api from "../services/api";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const [history, setHistory] = useState([])


  useEffect(()=> {
    const getHistory = async () => {
      const response = await api.get(`OrderHistory/${userEmail}`)
      setHistory(response.data.history)
    }
    getHistory()
  },[])
  return (
    <div className="flex flex-col justify-center gap-3 items-center">

    {history.length > 0 ? <div className="flex flex-col items-center gap-3">

    </div> 
    : 
    <div className="flex flex-col items-center gap-3">
      <img src="/src/assets/Empty State.png" alt="" className="w-16 h-16" />
      <h1 className="font-inter text-bl-500 text-center" >Your order history is waiting to be filled.</h1>
      <Link
            to={"/products"}
            className={
              "flex flex-row grow-0 flex-nowrap justify-center items-center font-medium text-P1 font-inter bg-bl-900 text-w-900 rounded-sm w-[183px] max-w-[183px] h-11 px-4 py-2"
            }
          >
            Start Shopping
            <img src="/src/icons/Arrow Right.png" alt="" />
          </Link>
    </div> }


    </div>
  )
}

export default OrderHistory
