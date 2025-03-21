import { Link } from "react-router-dom";

const SucessfullOrder = () => {
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="h-40 max-w-screen bg-g-100 mt-32 w-full">
        <div className="px-30 pt-10">
          <h1 className="text-h3 text-bl-900 font-inter font-bold">
            Successful Order
          </h1>
          <h2 className="text-p1 text-bl-500 font-medium flex">
            {`Outsider `} <img src="/src/icons/Chevron Right.png" />
            <b className="text-P1 font-medium text-bl-900">Successful Order</b>
          </h2>
        </div>
      </div>
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
