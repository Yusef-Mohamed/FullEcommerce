import { useContext, useEffect, useState } from "react";

import Cookies from "universal-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { CounterContext } from "./ShopPages";
import { Link, useNavigate } from "react-router-dom";

function Shopingcart() {
  const nav = useNavigate();
  const counter = useContext(CounterContext);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const [cart, setCart] = useState({});
  const [coupon, setCoupon] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [adres, setAdres] = useState({});
  const [pay, setPay] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [agian, setAgain] = useState(0);

  // Cart
  useEffect(() => {
    axios
      .get(
        "https://node-api-v1.onrender.com/api/v1/cart",

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
      .catch((err) => {
        console.log(err.response.status);
      });
    axios
      .get("https://node-api-v1.onrender.com/api/v1/addresses", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setAddresses(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [agian]);
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
  const handelOrder = function (e) {
    e.preventDefault();

    console.log(addresses[adres]);
    setLoading(true);
    if (pay == "online") {
      axios
        .get(
          `https://node-api-v1.onrender.com/api/v1/orders/checkout-session/${cart._id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
          {
            shippingAddress: {
              details: addresses[adres].details,
              phone: addresses[adres].phone,
              city: addresses[adres].city,
              postalCode: addresses[adres].postalCode,
            },
          }
        )
        .then((res) => {
          console.log(res.data.session.url);

          setTimeout(() => {
            counter.setCounter((prev) => prev + 1);
          }, 1000);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else if (pay == "cash") {
      axios
        .post(
          `https://node-api-v1.onrender.com/api/v1/orders/${cart._id}`,
          {
            shippingAddress: {
              details: addresses[adres].details,
              phone: addresses[adres].phone,
              city: addresses[adres].city,
              postalCode: addresses[adres].postalCode,
            },
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          setTimeout(() => {
            counter.setCounter((prev) => prev + 1);
            nav("/profile");
          }, 1000);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };
  return (
    <div>
      <div className="lg:grid-cols-12 lg:grid container mx-auto py-8 gap-4">
        <div className="lg:col-span-8 ">
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
        <div className=" lg:col-span-4 bg-white p-6 rounded-lg my-8 lg:my-0">
          <form className="flex  items-center" onSubmit={(e) => addCoupon(e)}>
            <input
              type="text"
              className="border p-2 h-10 flex-1 w-3/5"
              placeholder="Coupon"
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button className="text-dark bg-gold h-10 w-2/5 hover:bg-dark hover:text-gold transition flex-1">
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
          <form onSubmit={(e) => handelOrder(e)} className="px-4">
            <h2 className="border-t text-xl font-semibold py-4 text-dark">
              Check Out
            </h2>
            <label htmlFor="add" className="text-dark">
              Chose Shipping Address :
            </label>
            <select
              className="p-2 border focus:outline-none rounded-lg"
              id="add"
              required
              onChange={(e) => {
                if (e.target.value == 11) {
                  nav("/profile");
                } else {
                  setAdres(e.target.value);
                }
              }}
            >
              <option value="" hidden>
                Select Address
              </option>
              {addresses.map((add, index) => (
                <option value={index} key={add._id}>
                  {add.alias}
                </option>
              ))}
              <option value="11" onClick={() => nav("/profile")}>
                <Link to="/profile">Add New Address</Link>
              </option>
            </select>
            <div className="flex gap-8">
              <span>Payment method : </span>
              <div>
                <input
                  className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-gold checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-gold checked:after:bg-gold checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-gold checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-gold dark:checked:after:border-gold dark:checked:after:bg-gold dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-gold dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="radio"
                  name="pay"
                  required
                  value={"cash"}
                  id="cash"
                  onChange={() => setPay("cash")}
                />
                <label
                  className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor={"cash"}
                >
                  Cash
                </label>
              </div>
              <div>
                <input
                  className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-gold checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-gold checked:after:bg-gold checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-gold checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-gold dark:checked:after:border-gold dark:checked:after:bg-gold dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-gold dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="radio"
                  name="pay"
                  required
                  value={"online"}
                  onChange={() => setPay("online")}
                  id="online"
                />
                <label
                  className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="online"
                >
                  Online
                </label>
              </div>
            </div>
            <button className="btn bg-gold text-dark block w-full py-2 my-2 mt-6">
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
              ) : (
                <> Check Out</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Shopingcart;
