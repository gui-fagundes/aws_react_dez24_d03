import { Link } from "react-router-dom";
import BreadCrumbs from "../components/BreadCrumbs";
import { useEffect, useState } from "react";
import { SignedIn, useUser } from "@clerk/clerk-react";
import { useAppDispatch, useAppSelector } from "../store";
import api from "../services/api";

const Checkout = () => {
  const { user } = useUser();
  const [userFullName, setFullName] = useState(
    `${user?.firstName} ${user?.lastName}`
  );
  const [userEmailAddress, setEmailAddress] = useState(
    user?.primaryEmailAddress?.emailAddress || ""
  );
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [ziperror, setZipError] = useState("");
  const [disabled, setdisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.cart.items);
  const orderSubTotal = useAppSelector((state) => state.cart.subTotal);
  const [tax, setTaxes] = useState(orderSubTotal * 0.05);

  useEffect(() => {
    setTaxes(orderSubTotal * 0.05);
    return;
  }, [orderSubTotal]);

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

  const handlePlaceOrder = async () => {
    setLoading(true)

    const history = await (await api.get(`/OrderHistory/${user?.primaryEmailAddress?.emailAddress}`)).data.history
    await products.map((product) => {
      history.push({
        productId : product.productId,
        productImg : product.imagesUrl[0],
        productQuantity : product.quantity,
        productPrice : (product.price * product.quantity),
        productColor : product.color,
        productSize : product.size
      })
    })
    ;
    api.patch(`/OrderHistory/${user?.primaryEmailAddress?.emailAddress}`, {
      history: history
    })  
  }


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
              {ziperror && (
                <p className="text-red-500 text-sm mt-1">{ziperror}</p>
              )}
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
        <div className="max-w-93 w-full h-126 flex flex-col gap-3 justify-around">
          <div className="flex flex-col gap-10">
            <h1 className="font-inter font-semibold text-h5 text-bl-900">
              Your Order
            </h1>
            <div className="flex flex-row justify-center self-end border-1 border-bl-200 rounded-md h-11 w-27 items-center ">
              <Link
                to={"/cart"}
                className="w-full h-full flex items-center justify-center text-bl-500 text-p1 font-medium"
              >
                Edit Cart
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <h1>Subtotal</h1>
              <h1>{`R$ ${orderSubTotal.toFixed(2)}`}</h1>
            </div>
            <div className="flex flex-row justify-between">
              <h1>Shipping</h1>
              <h1>Free</h1>
            </div>
            <div className="flex flex-row justify-between">
              <h1>Tax</h1>
              <h1>{`R$ ${tax.toFixed(2)}`}</h1>
            </div>
            <hr />
            <div className="flex flex-row justify-between">
              <h1>Total</h1>
              <h1>{`R$ ${(tax + orderSubTotal).toFixed(2)}`}</h1>
            </div>
            <div
              className={
                "flex flex-row flex-nowrap justify-center font-medium text-p1 font-inter bg-bl-900 text-w-900 rounded-sm h-11 items-center px-4 py-2 cursor-pointer"
              }
              onClick={() => handlePlaceOrder()}
            >Place Order</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
