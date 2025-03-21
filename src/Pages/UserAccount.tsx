import { useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import AccountDetails from "../components/AccountDetails";
import OrderHistory from "../components/OrderHistory";

const UserAccount = () => {
  const [activeSection, setActiveSection] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="flex flex-col">
      <BreadCrumbs currentPage="My Account" />
      <div className="flex flex-col lg:flex-row flex-nowrap gap-3 justify-start items-center pl-40">
        <div className="flex flex-row lg:flex-col gap-3 lg:border-r-1 border-b-1 lg:border-b-0 border-w-200 lg:h-125 lg:w-60 justify-start items-center pt-20 mt-10 lg:my-10 text-bl-500">
          <div
            className={`flex items-center h-10 w-40 rounded-md px-2 text-p1 font-inter font-medium cursor-pointer gap-2 ${
              !activeSection ? `bg-w-100 text-bl-900` : ``
            }`}
            onClick={() => setActiveSection(false)}
          >
            <img src="/src/icons/CartIcon.png" alt="" className="h-5 w-5" />
            Orders
          </div>
          <div
            className={`flex items-center h-10 w-40 rounded-md px-2 text-p1 font-inter font-medium cursor-pointer gap-2 ${
              activeSection ? `bg-w-100 text-bl-900` : ``
            }`}
            onClick={() => setActiveSection(true)}
          >
            <img src="/src/icons/User2.png" alt="" className="h-5 w-5" />
            Account Details
          </div>
          <div
            className="flex items-center h-10 w-40 rounded-md px-2 text-p1 font-inter font-medium cursor-pointer gap-2"
            onClick={() => handleSignOut()}
          >
            <img src="/src/icons/Logout.png" alt="" className="h-5 w-5" />
            Log Out
          </div>
        </div>
        <div className="w-full self-start mt-20 mr-3">
          {activeSection ? <AccountDetails /> : <OrderHistory />}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
