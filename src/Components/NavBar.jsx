import { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { CounterContext, SearchContext } from "../Pages/ShopPages";

function NavBar() {
  const counter = useContext(CounterContext);
  const searsh = useContext(SearchContext);

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  // handel Search
  const queryParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    if (queryParams.get("keyword")) {
      setFilter(queryParams.get("keyword"));
    }
  }, []);
  const handleFilterChange = (event) => {
    const data = event.target.value;
    setFilter(data);
    if (data) {
      queryParams.set("keyword", data);
    } else {
      queryParams.delete("keyword");
    }
    navigate(`?${queryParams.toString()}`);
    searsh.setSearsh((prev) => prev + 1);
  };

  useEffect(() => {
    axios
      .get("https://node-api-v1.onrender.com/api/v1/categories")
      .then((res) => {
        setCategories(res.data.data);
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
        <div className="flex ">
          <input
            type="text"
            placeholder="Search"
            className="border py-2 px-4 rounded-l-2xl block"
            value={filter}
            onChange={handleFilterChange}
            onFocus={() =>
              window.location.pathname === "/products"
                ? true
                : navigate("/products")
            }
          />
          <button>
            <i className="text-dark bg-gold py-3 border-gold border px-8 md:px-6 hover:bg-dark hover:text-gold hover:border-dark transition rounded-r-2xl  fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="hidden md:block">
          <div className="text-gray-600 text-center text-sm">
            Customer servers
          </div>
          <div className="text-gray-600 text-center text-sm">+201222222</div>
        </div>
      </div>
      <div className="bg-dark text-white  font-semibold">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="text-xl bg-gold py-6 w-fit text-dark px-2 dropdown-con relative z-50 hidden md:block">
            <i className="fa-solid fa-bars ml-2 mr-4"></i>
            Categories
            <i className="mx-2 fa-sharp fa-solid fa-arrow-down"></i>
            {/* dropdown */}
            <div className="dropdown absolute py-3 w-full border rounded-lg bg-white  transition hidden mt-5 right-0">
              <div className="flex gap-1 flex-col">
                {categories.map((e) => (
                  <Link
                    key={e._id}
                    className="p-1 px-3 hover:bg-slate-100 transition border-b border-dashed"
                    to={`/products?category=${e._id}`}
                  >
                    {e.name}
                  </Link>
                ))}
              </div>
            </div>
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
            <NavLink
              activeclassname="active"
              className="text-white font-semibold text-lg p-4 block nav-link"
              to="/checkout"
            >
              Check Out
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
    </div>
  );
}

export default NavBar;
