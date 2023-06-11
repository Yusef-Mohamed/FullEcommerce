import React, { useEffect, useState } from "react";
import NewAddress from "./NewAddress";
import axios from "axios";
import Cookies from "universal-cookie";

function CheckOut() {
  const [refresh, setRfresh] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [cart, setCart] = useState([]);
  const [adres, setAdres] = useState({});
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  useEffect(() => {
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
  }, [refresh]);
  const deletee = function (id) {
    axios
      .delete(`https://node-api-v1.onrender.com/api/v1/addresses/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setRfresh((prev) => prev + 1);
      })
      .catch((err) => console.log(err));
  };
  const handelOrder = function (e) {
    e.preventDefault();
    console.log(addresses[adres]);
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
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="md:grid-cols-12 my-16 md:grid container mx-auto gap-8">
      <div className="md:col-span-8">
        <h2 className="heading mb-8">
          <span className="text-2xl">My Addresses</span>
        </h2>
        <div className="p-6 bg-white">
          {addresses.map((add, index) => (
            <div
              key={add._id}
              className={`md:grid md:grid-cols-2   ${
                index == addresses.length - 1
                  ? ""
                  : "border-b border-b-dark border-b-2 mb-4 pb-4"
              }`}
            >
              <div className="md:col-span-2 text-dark font-semibold text-lg pr-2s">
                Address Number {index + 1}
              </div>
              <h2 className=" p-2">
                <span className="text-dark font-semibold text-lg pr-2">
                  Name :
                </span>
                {add.alias}
              </h2>
              <p className=" p-2">
                <span className="text-dark font-semibold text-lg pr-2">
                  Details:
                </span>
                {add.details}
              </p>
              <p className=" p-2">
                <span className="text-dark font-semibold text-lg pr-2">
                  Phone:
                </span>
                {add.phone}
              </p>
              <p className=" p-2">
                <span className="text-dark font-semibold text-lg pr-2">
                  Postal Code:
                </span>
                {add.postalCode}
              </p>
              <p className=" p-2">
                <span className="text-dark font-semibold text-lg pr-2">
                  City:
                </span>
                {add.city}
              </p>
              <button
                className="block text-left p-2 text-white bg-danger-600 w-fit mx-2 rounded-md"
                onClick={(e) => deletee(add._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <h2 className="heading my-8">
          <span className="text-2xl">New Address</span>
        </h2>
        <div className="p-6 bg-white">
          <NewAddress setRfresh={setRfresh} />
        </div>
      </div>
      <div className="md:col-span-4 mt-4 md:mt-0">
        <h2 className="heading mb-8">
          <span className="text-2xl">Order Details</span>
        </h2>
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
        <h2 className="heading my-8">
          <span className="text-2xl">Send The Order</span>
        </h2>
        <div className="text-dark font-semibold bg-white p-4 rounded-lg">
          <form onSubmit={(e) => handelOrder(e)}>
            <label htmlFor="add">Chose Shipping Address :</label>
            <select
              className="p-2 border focus:outline-none rounded-lg"
              id="add"
              required
              onChange={(e) => setAdres(e.target.value)}
            >
              <option value="" hidden>
                Select Address
              </option>
              {addresses.map((add, index) => (
                <option value={index} key={add._id}>
                  {add.alias}
                </option>
              ))}
            </select>

            <button className="btn bg-gold text-dark block w-full py-2 my-2 mt-6">
              Send Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
