import { Link } from "react-router-dom";
import Cards from "../components/Cards";

const Home = () => {
  return (
    <div className="flex flex-col flex-nowrap gap-3">
      <div className="flex flex-col md:flex-row justify-around bg-w-100 flex-nowrap mt-32 items-center max-h-110">
        <div className="flex flex-col justify-center gap-10">
          <div>
            <h1 className="font-inter text-[32px] font-semibold text-bl-800">
              Fresh Arrivals Online
            </h1>
            <p className="font-inter text-[14px] font-normal text-bl-600">
              Discover our Newest Collection Today.
            </p>
          </div>
          <Link
            to={"/products"}
            className={
              "flex flex-row grow-0 flex-nowrap justify-center font-medium text-p1 font-inter bg-bl-900 text-w-900 rounded-sm w-[183px] max-w-[183px] h-11 place-content-center px-4 py-2"
            }
          >
            View Collection
            <img src="/src/icons/Arrow Right.png" alt="" />
          </Link>
        </div>
        <div className="bg-[url-(/src/assets/Hero-elipse.png)] collapse md:visible">
          <div className="h-110 overflow-y-hidden ">
            <img
              src="/src/assets/Hero-Image.png"
              alt=""
              className="h-95 z-2 relative top-15 left-10"
            />
            <img
              src="/src/assets/Hero-elipse.png"
              alt=""
              className="relative bottom-75 h-85 z-1"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row bg-w-900 justify-center px-15 items-center gap-4 py-20">
        <div className="max-h-[266px] max-w-82 px-10 flex flex-col gap-3">
          <img src="/src/icons/IconTruck.png" alt="" className="h-12 w-12" />
          <h1 className="text-H5 text-bl-800 font-semibold font-inter">
            Free Shipping
          </h1>
          <p className="text-p1 text-bl-500 font-normal">
            Upgrade your style today and get FREE shipping on all orders! Don't
            miss out.
          </p>
        </div>
        <div className="max-h-[266px] max-w-82 px-10 flex flex-col gap-3">
          <img src="/src/icons/IconBadge.png" alt="" className="h-12 w-12" />
          <h1 className="text-h5 text-bl-800 font-semibold font-inter">
            Satisfaction Guarantee
          </h1>
          <p className="text-p1 text-bl-500 font-normal">
            Shop confidently with our Satisfaction Guarantee: Love it or get a
            refund.
          </p>
        </div>
        <div className="max-h-[266px] max-w-82 px-10 flex flex-col gap-3">
          <img src="/src/icons/IconVerify.png" alt="" className="h-12 w-12" />
          <h1 className="text-h5 text-bl-800 font-semibold font-inter">
            Secure Payment
          </h1>
          <p className="text-p1 text-bl-500 font-normal">
            Your security is our priority. Your payments are secure with us.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-10 items-center px-25">
        <h1 className="font-inter text-l1 font-medium text-bl-300">Shop Now</h1>
        <h1 className="font-inter text-h3 text-bl-900 font-bold">
          Best Selling
        </h1>
        <Cards />
      </div>
      <div className="flex flex-col md:flex-row justify-around bg-w-100 flex-nowrap mt-32 items-center">
        <div className="flex flex-col justify-center gap-10">
          <div>
            <h1 className="font-inter text-[32px] font-semibold text-bl-800">
              Browse Our Fashion Paradise!
            </h1>
            <p className="font-inter text-[14px] font-normal text-bl-600">
              Step into a world of style and explore our diverse collection of
              clothing categories.
            </p>
          </div>
          <Link
            to={"/products"}
            className={
              "flex flex-row grow-0 flex-nowrap justify-center font-medium text-P1 font-inter bg-bl-900 text-w-900 rounded-sm w-[183px] max-w-[183px] h-11 place-content-center px-4 py-2"
            }
          >
            Start Browsing
            <img src="/src/icons/Arrow Right.png" alt="" />
          </Link>
        </div>
        <div className="bg-[url-(/src/assets/Hero-elipse.png)]  invisible md:visible">
          <img
            src="/src/assets/CategoryImage.png"
            alt=""
            className="h-[255px]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-10 items-center px-25">
        <h1 className="font-inter text-p1 font-medium text-bl-800 border-1 border-w-200 rounded-2xl bg-w-900 w-22 h-8 content-center text-center">
          On Offer
        </h1>
        <Cards />
      </div>
    </div>
  );
};

export default Home;
