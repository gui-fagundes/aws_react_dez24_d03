import React from "react";

const Footer = () => {
  return (
    <div className="h-[629px] bg-white flex flex-col flex-nowrap justify-between">
      <div className="bg-[#f6f6f6] h-[200px] flex flex-row justify-around items-center">
      <div className="flex flex-col flex-nowrap gap-3">
      <h1 className="font-inter font-bold text-2xl tex-bl-900">Join Our Newsletter</h1>
      <p className="font-inter font-normal text-sm text-gr-100">We love to surprise our subscrivers with occasional gifts.</p>
      </div>
      <div className="flex flex-row flex-nowrap gap-3 font-inter text-sm">
      <input className="bg-white border-1 border-gr-100 rounded-md h-[45px] w-[320] px-4 py-2" type="email" placeholder="Your email address"/>
      <button className="text-w-900 bg-bl-900 font-medium font-inter text-P1 text-center px-4 py-2 rounded-md h-[45px] w-[116px]">Subscribe</button>
      </div>
      </div>
      <div className="flex flex-row justify-evenly">
        <div className="flex flex-col gap-4 pt-8">
          <div className="flex flex-row gap-3 items-center">
            <img src="/src/icons/logo/Logomark.png" alt="" />
            <h1 className="font-extrabold text-xl text-bl-900">Outsider</h1>
          </div>
          <div className="max-w-64">
            <h1 className="text-P1 font-normal text-bl-500">
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
          <div className="flex flex-col gap-10 text-bl-300 text-P1 font-medium">
            SUPPORT
            <ul className="flex flex-col gap-3 text-bl-500">
              <li>FAQ</li>
              <li>Terms of Use</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="flex flex-col gap-10 text-bl-300 text-P1 font-medium">
            COMPANY
            <ul className="flex flex-col gap-3 text-bl-500">
              <li>About Us</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className="flex flex-col gap-10 text-bl-300 text-P1 font-medium">
            SHOP
            <ul className="flex flex-col gap-3 text-bl-500 ">
              <li>My Account</li>
              <li>Checkout</li>
              <li>Cart</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-10 text-bl-300 text-P1 font-medium font-inter">
          <div>ACCEPTED PAYMENTS</div>
          <div className="flex flex-row gap-3">
            <img src="/src/icons/Mastercard.png" alt="" />
            <img src="/src/icons/Amex.png" alt="" />
            <img src="/src/icons/Visa.png" alt="" />
          </div>
        </div>
      </div>
      <div className="text-center place-content-center text-bl-500 border-t-1 border-w-100 h-[79px]">© 2023 DevCut. All rights reserved.</div>
    </div>
  );
};

export default Footer;
