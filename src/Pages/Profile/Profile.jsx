import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Cookies from "universal-cookie";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const [data, setData] = useState({});
  const [order, setOrder] = useState([]);
  const [wish, setWish] = useState([]);
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
  }, []);
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
            <div className="text-white font-semibold text-lg">{data.name}</div>
            <div className="text-white font-semibold text-lg">{data.email}</div>
            <div className="text-white font-semibold text-lg">{data.role}</div>
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
                  <td className="py-4">{order.shippingAddress.city}</td>
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

export default Profile;
Profile;
