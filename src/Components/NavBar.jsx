import { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { CounterContext } from "../Pages/ShopPages";
import { Sidenav, initTE } from "tw-elements";
function NavBar() {
  initTE({ Sidenav });
  const counter = useContext(CounterContext);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://node-api-v1.onrender.com/api/v1/categories")
      .then((res) => {
        setCategories(res.data.data);
        console.log(
          res.data.data.sort((a, b) =>
            a.category.name.localeCompare(b.category.name)
          )
        );
      })
      .catch((err) => console.log(err));
    axios
      .get("https://reelstore.metafortech.com/api/v1/products ")
      .then((res) => {
        console.log(res);
        // setCategories(res.data.data);
        console.log(
          res.data.data.sort((a, b) =>
            a.category.name.localeCompare(b.category.name)
          )
        );
      })
      .catch((err) => console.log(err));
  }, []);
  // Wish List
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const [wish, setWish] = useState([]);
  const [cart, setCart] = useState({});
  useEffect(() => {
    axios
      .get("https://node-api-v1.onrender.com/api/v1/wishlist", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setWish(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [counter.counter]);
  // Cart
  useEffect(() => {
    console.log("nav");

    axios
      .get("https://node-api-v1.onrender.com/api/v1/cart", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCart(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [counter.counter]);
  return (
    <div>
      <div className="container flex py-3 items-center  justify-center md:justify-between mx-auto">
        <span className="hidden md:block">
          <Logo />
        </span>
        <div className="flex "></div>
        <div className="hidden md:block">
          <div className="text-gray-600 text-center text-sm">
            Customer servers
          </div>
          <div className="text-gray-600 text-center text-sm">+201222222</div>
        </div>
      </div>
      <div className="bg-dark text-white  font-semibold">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div>
            <button
              className=" text-xl  py-6 w-fit  px-2  z-50  md:block hidden shadow-md transition duration-150 ease-in-out    text-dark bg-gold "
              data-te-sidenav-toggle-ref
              data-te-target="#sidenav-1"
              aria-controls="#sidenav-1"
              aria-haspopup="true"
            >
              <span className="block ">
                <i className="fa-solid fa-bars ml-2 mr-4"></i>
                Categories
                <i className="mx-2 fa-sharp fa-solid fa-arrow-down"></i>
              </span>
            </button>
            <nav
              id="sidenav-1"
              className="absolute left-0 top-0 z-[1035] h-full w-60 -translate-x-full overflow-hidden bg-dark p-4"
              data-te-sidenav-init
              data-te-sidenav-hidden="true"
              data-te-sidenav-position="absolute"
            >
              <ul>
                {categories.map((e) => (
                  <Link
                    key={e._id}
                    className="py-4 block border-b border-b-white"
                  >
                    {e.name}
                  </Link>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex md:hidden items-center justify-between w-full">
            <div className="p-4 ">
              <Logo style={"nav"} />
            </div>
            <div
              className="toggle ml-auto"
              onClick={(e) => {
                console.log(0);
                document.querySelector(".toggle-box").classList.toggle("open");
              }}
            >
              <i className="fa-solid fa-bars ml-2 mr-4 text-4xl cursor-pointer"></i>
            </div>
          </div>
          <div className="flex-col md:flex-row toggle-box flex mr-auto md:mr-0">
            <NavLink
              activeclassname="active"
              className="text-white font-semibold text-lg p-4 block nav-link md:ml-6"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              activeclassname="active"
              className="text-white font-semibold text-lg p-4 block nav-link"
              to="/products"
            >
              Shop
            </NavLink>
            <NavLink
              activeclassname="active"
              className="text-white font-semibold text-lg p-4 block nav-link"
              to="/shopingcart"
            >
              Shoping Cart
            </NavLink>

            <div className="p-4 mt-0 md:p-0 md:mb-0 md:ml-auto flex">
              <div className="flex items-center">
                <i className="fa-solid fa-heart text-xl mx-2 relative"></i>
                <div
                  className="rounded-full border w-6 h-6 flex justify-center items-center"
                  id="wish"
                >
                  {wish.length}
                </div>
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-cart-shopping text-xl mx-2"></i>
                <div
                  className="rounded-full border w-6 h-6 flex justify-center items-center"
                  id="cart"
                >
                  {cart.cartItems && cart.cartItems.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default NavBar;
