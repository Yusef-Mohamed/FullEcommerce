import React from "react";
import { Link } from "react-router-dom";
import payment from "../images/payments.png";
function Footer() {
  return (
    <div className="bg-dark text-white py-12 mt-16">
      <div className="lg:grid lg:grid-cols-12 container mx-auto">
        <div className="lg:col-span-4 mb:4 lg:mb-0 p-2">
          <h2 className="mb-4 text-xl">GET IN TOUCH</h2>
          <p>
            No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et
            et dolor sed dolor. Rebum tempor no vero est magna amet no
          </p>
          <ul className="mt-4">
            <li className="my-2">
              <i className="fa-solid fa-location-dot text-gold mr-3"></i>
              Alex Egypt
            </li>
            <li className="my-2">
              <i className="fa-solid fa-envelope text-gold mr-3"></i>
              ZxGameryt123@Gmail.com
            </li>
            <li className="my-2">
              <i className="fa-solid fa-phone text-gold mr-3"></i>
              +20 120 750 3648
            </li>
          </ul>
        </div>
        <div className="lg:col-span-8 md:grid md:grid-cols-3">
          <div className="col-span-1 p-2">
            <h2 className="mb-4 text-xl">QUICK SHOP</h2>
            <ul>
              <li className="p-3">
                <i className="text-xs fa-solid fa-angle-right mr-3"></i>
                <Link to={""} className="hover:text-gold transition">
                  Home
                </Link>
              </li>
              <li className="p-3">
                <i className="text-xs fa-solid fa-angle-right mr-3"></i>

                <Link to={"products"} className="hover:text-gold transition">
                  Shop
                </Link>
              </li>
              <li className="p-3">
                <i className="text-xs fa-solid fa-angle-right mr-3"></i>
                <Link to={"shopingcart"} className="hover:text-gold transition">
                  Shoping Cart
                </Link>
              </li>
              <li className="p-3">
                <i className="text-xs fa-solid fa-angle-right mr-3"></i>
                <Link to={"checkout"} className="hover:text-gold transition">
                  Check Out
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 p-2">
            <h2 className="mb-4 text-xl ">Contact Us</h2>
            <div className="flex">
              <div className="border-r-[#6c757d] border-r flex-1">
                <h3 className="py-4">FrontEnd Developer </h3>
                <h4 className="py-4">Yousef Mohamed</h4>
                <a
                  href="https://wa.me/+201207503648"
                  className="hover:text-gold transition py-4 block"
                  target="_blank"
                >
                  Hire Me : +201207503648
                </a>
              </div>
              <div className="px-4 flex-1">
                <h3 className="py-4">BackEnd Developer </h3>
                <h4 className="py-4">AbdEl-Rahman</h4>
                <a
                  href="https://wa.me/+201028337311"
                  className="hover:text-gold transition py-4 block"
                  target="_blank"
                >
                  Hire Me : +201028337311
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex justify-between  container mx-auto pt-12 border-t border-t-[#6c757d]">
        <span>
          All Rights Reserved. Designed by
          <a
            href="https://htmlcodex.com/"
            className="text-gold"
            target="_blank"
          >
            HTML Codex
          </a>
        </span>
        <img src={payment} alt="payment" />
      </div>
    </div>
  );
}

export default Footer;
