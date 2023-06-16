import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Cookies from "universal-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NewAddress from "./NewAddress";

function Profile() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const nav = useNavigate();

  const [data, setData] = useState({});
  const [order, setOrder] = useState([]);
  const [wish, setWish] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [refresh, setRfresh] = useState(0);
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
  useEffect(() => {
    axios
      .get(`https://node-api-v1.onrender.com/api/v1/users/getMe`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(`https://node-api-v1.onrender.com/api/v1/orders`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setOrder(res.data.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(`https://node-api-v1.onrender.com/api/v1/wishlist`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setWish(res.data.data);
      })
      .catch((err) => console.log(err));
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
  }, [refresh]);
  const dellete = function () {
    axios
      .delete(`https://node-api-v1.onrender.com/api/v1/users/deleteMe`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const active = function () {
    axios
      .put(`https://node-api-v1.onrender.com/api/v1/users/activeMe`, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  console.log(order);
  if (!token) {
    setTimeout(() => {
      nav("/login");
    }, 1000);
  } else {
    return (
      <div>
        <Header />
        <div className="bg-dark p-10 text-white flex items-center justify-center ">
          <div className="flex items-center justify-center container mx-auto">
            <img
              src={data.profileImg}
              className="rounded-full w-24 h-24 border mx-10 "
            />
            <div className="text-center pl-10 border-l py-5">
              <div className="text-white font-semibold text-lg">
                {data.name}
              </div>
              <div className="text-white font-semibold text-lg">
                {data.email}
              </div>
              <div className="text-white font-semibold text-lg">
                {data.role}
              </div>
            </div>
          </div>
        </div>
        <div className="gap-5 bg-gray-100 p-10 text-white flex flex-col md:flex-row items-center justify-center container mx-auto">
          <Link className="btn bg-dark text-gold p-2 " to={"changepassword"}>
            Change Password
          </Link>
          <Link className="btn bg-dark text-gold p-2 " to={"updatedata"}>
            Change My Data
          </Link>
          {data.active ? (
            <span className="btn bg-dark text-gold p-2 " onClick={dellete}>
              UnActive My Account
            </span>
          ) : (
            <span className="btn bg-dark text-gold p-2 " onClick={active}>
              Active My Account
            </span>
          )}
        </div>
        <div className="p-6 bg-white container mx-auto rounded-lg">
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
          {addresses.length === 0 && (
            <span className="text-dark block text-center text-xl">
              You have no Addresses{" "}
            </span>
          )}
        </div>
        <NewAddress setRfresh={setRfresh} />
        <div className="container mx-auto">
          <h2 className="heading mb-8">
            <span className="text-2xl">Wish List</span>
          </h2>
          <div className="overflow-x-auto w-[90%] md:w-full md:max-w-full ">
            <table className="w-full">
              <thead className="bg-dark text-white ">
                <th className="py-3 px-1 md:p-3">Product</th>
                <th className="py-3 px-1 md:p-3">Price</th>
                <th className="py-3 px-1 md:p-3">Rate</th>
                <th className="py-3 px-1 md:p-3">Link</th>
              </thead>
              <tbody>
                {wish.map((product) => (
                  <tr key={product.id} className="text-center odd:bg-gray-100">
                    <td className="py-4">{product.title}</td>
                    <td>{product.price}</td>
                    <td>
                      {`  ${product.ratingsAverage}(${product.ratingsQuantity})`}
                    </td>
                    <td>
                      <Link
                        className="text-white bg-green-400 p-2"
                        to={`/product/${product._id}`}
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="container mx-auto my-8">
          <h2 className="heading mb-8">
            <span className="text-2xl">My Orders</span>
          </h2>
          <div className="overflow-x-auto w-[90%] md:w-full md:max-w-full ">
            <table className="w-full">
              <thead className="bg-dark text-white ">
                <th className="py-3 px-1 md:p-3">City</th>
                <th className="py-3 px-1 md:p-3">TotalPrice</th>
                <th className="py-3 px-1 md:p-3">Delivered</th>
                <th className="py-3 px-1 md:p-3">Paid</th>
              </thead>
              <tbody>
                {order.map((order) => (
                  <tr key={order.id} className="text-center odd:bg-gray-100">
                    {order.shippingAddress ? (
                      <td className="py-4">{order.shippingAddress.city}</td>
                    ) : (
                      <td className="py-4">Not Found</td>
                    )}
                    <td>{order.totalOrderPrice}</td>
                    <td>{order.isDelivered ? "yes" : "no"}</td>
                    <td>{order.isPaid ? "yes" : "no"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
Profile;
