import React from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import { Link } from "react-router-dom";

const SucessfullOrder = () => {
  return (
    <div className="flex flex-col gap-3 items-center">
      <BreadCrumbs currentPage="Sucessfull Order" />
      <div className="flex flex-col gap-3 items-center my-20">

      <div className="h-40 w-40">
        <img src="/src/assets/Illustration.png" alt="" />
      </div>

        <h1 className="text-bl-500 font-normal font-inter text-p1 max-w-80 text-center">
          Your order has been successfully placed and is now being processed.
        </h1>

          <Link
            to={"/myaccount"}
            className={
                "flex flex-row grow-0 flex-nowrap justify-center items-center font-medium text-p1 font-inter bg-bl-900 text-w-900 rounded-sm w-[183px] max-w-[183px] h-11 px-4 py-2"
            }
            >
            Go to my account
            <img src="/src/icons/Arrow Right.png" alt="" />
          </Link>


              </div>
    </div>
  );
};

export default SucessfullOrder;
