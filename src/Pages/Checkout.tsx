import { Link } from "react-router-dom";
import BreadCrumbs from "../components/BreadCrumbs";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

const Checkout = () => {
  const { user } = useUser();
  const [userFullName, setFullName] = useState(`${user?.firstName} ${user?.lastName}`);
  const [userEmailAddress, setEmailAddress] = useState(user?.primaryEmailAddress?.emailAddress || "");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [ziperror, setZipError] = useState("");
  const [disabled, setdisabled] = useState(false);

  const validateZip = (cep: string) => {
    const regex = /^\d+$/;
    if (cep.length != 7) {
      setZipError("Zip code must have exactly 8 digits");
      return;
    } else if (!regex.test(zipCode)) {
      setZipError("Zip code must contain only numbers");
      return;
    }
    setZipError("");
  };

  const checkCep = async (cep: string) => {
    if (ziperror) return;

    const consulta = `https://viacep.com.br/ws/${cep}/json/`;
    fetch(consulta)
      .then((res) => res.json())
      .then((data) => {
        setStreetAddress(data.logradouro);
        setCity(data.localidade);
        setCountry("Brazil");
        setStateName(data.uf);
        setdisabled(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (ziperror) {
      setStreetAddress("");
      setCity("");
      setCountry("");
      setStateName("");
      setdisabled(false);
    }
  }, [ziperror]);
  return (
    <div className="flex flex-col w-screen">
      <BreadCrumbs currentPage="Checkout" />
      <div className="flex flex-col md:flex-row flex-wrap gap-3 px-40">
        <div className="flex flex-col gap-3 md:border-r-1 border-w-200 h-125 justify-center items-center pt-0 max-w-134 pr-10">
          <h1 className="font-inter font-semibold text-h5 text-bl-900">
            Shipping Address
          </h1>
          <form
            action=""
            className="flex flex-row flex-wrap gap-4 text-bl-600 font-inter text-p1 font-medium"
          >
            <div className="flex flex-col flex-nowrap w-65">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                placeholder="Zip Code"
                className="border-1 border-bl-100 rounded-md h-11 px-2 outline-none"
                onChange={(e) => {
                  setZipCode(e.target.value);
                  validateZip(zipCode);
                }}
                onBlur={(e) => checkCep(e.target.value)}
              />
              {ziperror && <p className="text-red-500 text-sm mt-1">{ziperror}</p>}
            </div>
            <div className="flex flex-col flex-nowrap w-65">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                placeholder="City"
                className="border-1 border-bl-100 rounded-md h-11 px-2 outline-none"
                value={city}
                disabled={disabled}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-nowrap w-65">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                placeholder="State"
                className="border-1 border-bl-100 rounded-md h-11 px-2 outline-none"
                value={stateName}
                disabled={disabled}
                onChange={(e) => setStateName(e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-nowrap w-65">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                placeholder="Country"
                className="border-1 border-bl-100 rounded-md h-11 px-2 outline-none"
                value={country}
                disabled={disabled}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-nowrap w-134">
              <label htmlFor="streetAddress">Street Address</label>
              <input
                type="text"
                id="streetAddress"
                placeholder="Street Address"
                className="border-1 border-bl-100 rounded-md h-11 px-2 outline-none"
                value={streetAddress}
                disabled={disabled}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-nowrap w-65">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="border-1 border-bl-100 rounded-md h-11 px-2 outline-none"
                defaultValue={userEmailAddress}
                disabled={true}
              />
            </div>
            <div className="flex flex-col flex-nowrap w-65">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                className="border-1 border-bl-100 rounded-md h-11 px-2 outline-none"
                defaultValue={userFullName}
                disabled={true}
              />
            </div>
          </form>
        </div>
        <div className="max-w-93 h-126 flex flex-col gap-3 justify-around">
          <div className="">
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
              <Link
                to={"/sucessfullOrder"}
                className={
                  "flex flex-row grow-0 flex-nowrap justify-center font-medium text-p1 font-inter bg-bl-900 text-w-900 rounded-sm w-93 h-11 place-content-center px-4 py-2"
                }
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
