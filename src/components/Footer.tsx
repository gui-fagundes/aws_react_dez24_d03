import { useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../services/api";

const Footer = () => {
  const [newsLetterEmail, setNewsLetterEmail] = useState("");
  const [erroreMail, seterrorEmail] = useState("");
  const [validatePass, setValidatePass] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleNewsLetterSubmit = (e) => {
    e.preventDefault();
    if (!newsLetterEmail) return;
    if (!validateEmail(newsLetterEmail)) {
      seterrorEmail("Please use a valid email.");
      return;
    }
    seterrorEmail("");
    setValidatePass(true);
    api.post(`/NewsLetter`, {
      email: newsLetterEmail,
    });
    setTimeout(() => {
      setValidatePass(false);
    }, 2000);
  };
  return (
    <div className="h-[629px] bg-white flex flex-col flex-nowrap justify-between">
      {validatePass && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4 md:px-0">
            <div className="bg-gradient-to-r from-bl-400 from-10% via-bl-600 via-50% to-bl-800 to-90% text-white font-playfair p-6 text-xl md:text-2xl rounded-2xl text-center max-w-xs md:max-w-md w-full">
              Thank you for Joining out NewsLetter
            </div>
          </div>
        </>
      )}
      <div className="bg-[#f6f6f6] h-[200px] flex flex-col md:flex-row justify-around items-center py-5 lg:py-0">
        <div className="flex flex-col flex-nowrap gap-3">
          <h1 className="font-inter font-bold text-2xl tex-bl-900">
            Join Our Newsletter
          </h1>
          <p className="font-inter font-normal text-sm text-gr-100">
            We love to surprise our subscrivers with occasional gifts.
          </p>
        </div>
        <div className="flex flex-col flex-nowrap gap-3 font-inter text-sm">
          <div className="flex flex-row flex-nowrap gap-3 font-inter text-sm">
            <input
              className="bg-white border-1 border-gr-100 rounded-md h-[45px] w-[320] px-4 py-2 outline-none"
              type="email"
              placeholder="Your email address"
              onChange={(e) => setNewsLetterEmail(e.target.value)}
            />
            <div
              className="text-w-900 flex items-center justify-center bg-bl-900 font-medium font-inter text-p1 text-center px-4 py-2 rounded-md h-[45px] w-[116px] cursor-pointer"
              onClick={(e) => handleNewsLetterSubmit(e)}
            >
              Subscribe
            </div>
          </div>
          {erroreMail && (
            <p className="font-inter text-l1 text-r-900 text-center">
              {erroreMail}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-5 lg:gap-0">
        <div className="flex flex-col gap-4 pt-8 items-center lg:items-start">
          <div className="flex flex-row gap-3 items-center">
            <img src="/src/icons/logo/Logomark.png" alt="" />
            <h1 className="font-extrabold text-xl text-bl-900">Outsider</h1>
          </div>
          <div className="lg:max-w-64">
            <h1 className="text-p1 font-normal text-bl-500">
              DevCut is a YouTube channel for practical project-based learning.
            </h1>
          </div>
          <div className="flex flex-row gap-3">
            <a href="http://github.com" target="blank">
              <img src="/src/icons/Github.png" alt="Github link" />
            </a>
            <a href="http://instagram.com" target="blank">
              <img src="/src/icons/Instagram.png" alt="Instagram link" />
            </a>
            <a href="http://youtube.com" target="blank">
              <img src="/src/icons/Youtube.png" alt="Youtube link" />
            </a>
          </div>
        </div>
        <div className="flex gap-10 font-inter">
          <div className="flex flex-col gap-10 text-bl-300 text-p1 font-medium">
            SUPPORT
            <ul className="flex flex-col gap-3 text-bl-500">
              <li>
                <NavLink to={"/Page404"}>FAQ</NavLink>
              </li>
              <li>
                <NavLink to={"/Page404"}>Terms of Use</NavLink>
              </li>
              <li>
                <NavLink to={"/Page404"}>Privacy Policy</NavLink>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-10 text-bl-300 text-p1 font-medium">
            COMPANY
            <ul className="flex flex-col gap-3 text-bl-500">
              <li>
                <NavLink to={"/About"}>About Us</NavLink>
              </li>
              <li>
                <NavLink to={"/contact"}>Contact</NavLink>
              </li>
              <li>
                <NavLink to={"/Page404"}>Carreers</NavLink>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-10 text-bl-300 text-p1 font-medium">
            SHOP
            <ul className="flex flex-col gap-3 text-bl-500 ">
              <li>
                <NavLink to={"/myaccount"}>My Account</NavLink>
              </li>
              <li>
                <NavLink to={"/checkout"}>Checkout</NavLink>
              </li>
              <li>
                <NavLink to={"/cart"}>Cart</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-10 text-bl-300 text-p1 font-medium font-inter">
          <div>ACCEPTED PAYMENTS</div>
          <div className="flex flex-row gap-3">
            <img src="/src/icons/Mastercard.png" alt="" />
            <img src="/src/icons/Amex.png" alt="" />
            <img src="/src/icons/Visa.png" alt="" />
          </div>
        </div>
      </div>
      <div className="text-center place-content-center text-bl-500 border-t-1 border-w-100 h-[79px] py-3 lg:py-0 mt-10">
        © 2025 Outsider. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
