import { useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import {useAuth} from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom";
import AccountDetails from "../components/AccountDetails";
import OrderHistory from "../components/OrderHistory";

const UserAccount = () => {
  const [activeSection, setActiveSection] = useState(false);
  const { signOut } = useAuth(); 
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }

  return (
    <div className="flex flex-col">
      <BreadCrumbs currentPage="My Account" />
      <div className="flex flex-col md:flex-row flex-nowrap gap-3 justify-start items-center pl-40">
        <div className="flex flex-col gap-3 md:border-r-1 border-w-200 h-125 w-60 items-center pt-20 my-10">
          <div
            className="h-10 w-30 text-p1 font-inter font-medium text-bl-900 cursor-pointer"
            onClick={() => setActiveSection(false)}
          >
            Orders
          </div>
          <div className="h-10  w-30 text-p1 font-inter font-medium text-bl-900 cursor-pointer"
          onClick={() => setActiveSection(true)}>
            Account Details
          </div>
          <div className="h-10  w-30 text-p1 font-inter font-medium text-bl-900 cursor-pointer "
          onClick={() => handleSignOut()}>
            Log Out
          </div>
        </div>
        <div className="w-full self-start mt-20">
          {activeSection ? <AccountDetails /> : <OrderHistory />}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
