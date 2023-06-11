import { useContext, useEffect, useState } from "react";

import Cookies from "universal-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { CounterContext } from "./ShopPages";
import { Link } from "react-router-dom";

function Shopingcart() {
  const counter = useContext(CounterContext);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const [cart, setCart] = useState({});
  const [coupon, setCoupon] = useState("");

  // Cart
  useEffect(() => {
    axios
      .get("https://node-api-v1.onrender.com/api/v1/cart", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setCart(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // Edit Cart Product  Amount
  const amountHanel = function (id, ammount) {
    axios
      .put(
        `https://node-api-v1.onrender.com/api/v1/cart/${id}`,
        {
          quantity: ammount,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        setCart(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const handelRemove = function (id) {
    axios
      .delete(`https://node-api-v1.onrender.com/api/v1/cart/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setCart(res.data.data);
        counter.setCounter((prev) => prev + 1);
      })
      .catch((err) => console.log(err));
  };
  const addCoupon = function (e) {
    e.preventDefault();
    axios
      .put(
        `https://node-api-v1.onrender.com/api/v1/cart/applaycoupon`,
        { coupon: coupon },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setCart(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="md:grid-cols-12 md:grid container mx-auto py-8 gap-4">
        <div className="md:col-span-8 ">
          <table className="w-full overflow-x-auto">
            <thead className="bg-dark text-white">
              <th className="max-w-[35%] p-2">Product</th>
              <th className=" p-2">Price</th>
              <th className=" p-2">quantity</th>
              <th className=" p-2">Remove</th>
            </thead>
            <tbody>
              {cart.cartItems &&
                cart.cartItems.map((e) => {
                  return (
                    <tr className="bg-white " key={e._id}>
                      <td className="line-clamp-2 text-sm m-2">
                        {e.product.title}
                      </td>
                      <td className="p-2 text-center">{e.price}$</td>
                      <td className="p-2 flex mx-auto justify-center ">
                        <div
                          className="w-8 h-8 bg-gold text-dark flex justify-center items-center text-lg font-bold cursor-pointer"
                          onClick={() => {
                            if (e.quantity == 1) {
                              toast.error(" quantity can not be 0!");
                            } else {
                              amountHanel(e._id, e.quantity - 1);
                            }
                          }}
                        >
                          -
                        </div>
                        <span className="w-8 h-8 text-dark flex justify-center items-center bg-gray-100">
                          {e.quantity}
                        </span>

                        <div
                          className="w-8 h-8 bg-gold text-dark flex justify-center items-center text-lg font-bold cursor-pointer"
                          onClick={() => amountHanel(e._id, e.quantity + 1)}
                        >
                          +
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => handelRemove(e._id)}
                          className="bg-danger-600 px-2 rounded-md text-white"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className=" md:col-span-4 bg-white p-6 rounded-lg my-8 md:my-0">
          <form className="flex  items-center" onSubmit={(e) => addCoupon(e)}>
            <input
              type="text"
              className="border p-2 h-10 flex-1"
              placeholder="Coupon"
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button className="text-dark bg-gold h-10 w-1/4 hover:bg-dark hover:text-gold transition">
              Apply Coupon
            </button>
          </form>
          <div className="text-dark font-semibold bg-white p-4 rounded-lg">
            <div className="py-2">Products Price: {cart.totalCartprice}$</div>
            <div className="pt-2 pb-4 border-b">
              Discound:{" "}
              {cart.totalCartpriceAfterDiscount
                ? `${cart.totalCartprice - cart.totalCartpriceAfterDiscount}$s`
                : "0"}
            </div>
            <div className="mt-4">
              Total Price:{" "}
              {cart.totalCartpriceAfterDiscount
                ? cart.totalCartpriceAfterDiscount
                : cart.totalCartprice}
              $
            </div>
          </div>
          <Link
            to="checkout"
            className="text-dark bg-gold p-3 mt-4 block w-1/2 md:w-full text-center mx-auto rounded-lg hover:text-gold hover:bg-dark font-semibold transition"
          >
            Check Out
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Shopingcart;
