import axios from "axios";
import React, { useEffect, useState } from "react";

import { apiRoute } from "../App";
import { toast } from "react-toastify";

function Main() {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [reff, setRef] = useState(0);
  const [productShow, setProductShow] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiRoute}/api/v1/orders`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setOrders(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [reff]);

  const deliver = function (id) {
    axios
      .put(
        `${apiRoute}/api/v1/orders/${id}/deliver`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => setRef((prev) => prev + 1))
      .catch((err) => console.log(err))
      .catch((err) => console.log(err));
  };
  const onCopy = (description) => {
    navigator.clipboard.writeText(description);
    toast.success("Id have been copied.");
  };

  return (
    <div className=" md:p-8 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-2xl ">Orders</h2>
      <div className="overflow-x-auto w-[95%] md:w-full md:max-w-full">
        <table className="w-full text-center">
          <thead className="bg-dark text-white">
            <tr>
              <th className="p-3">Owner Name</th>
              <th className="p-3">Paid</th>
              <th className="p-3">Paid at</th>
              <th className="p-3">Delivered</th>
              <th className="p-3">Delivered at</th>
              <th className="p-3">Arrival Time</th>
              <th className="p-3">Shipping city</th>
              <th className="p-3">Shipping details</th>
              <th className="p-3">Shipping phone</th>
              <th className="p-3">Shipping postalCode</th>
              <th className="p-3">Total Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="p-3">{order?.user?.name}</td>
                <td className="p-3">{order.isPaid ? "yes" : "no"}</td>
                <td className="p-3 whitespace-nowrap">
                  {order.paidAt ? (
                    <>
                      {new Date(order?.paidAt).toISOString().split("T")[0]}{" "}
                      time:
                      {new Date(order?.paidAt)
                        .toISOString()
                        .split("T")[1]
                        .slice(0, 2)}
                    </>
                  ) : (
                    "no"
                  )}
                </td>
                <td className="p-3">{order.isDelivered ? "yes" : "no"}</td>{" "}
                <td className="p-3 whitespace-nowrap">
                  {order?.deliveredAt ? (
                    <>
                      {new Date(order?.deliveredAt).toISOString().split("T")[0]}{" "}
                      time:
                      {new Date(order?.deliveredAt)
                        .toISOString()
                        .split("T")[1]
                        .slice(0, 2)}
                    </>
                  ) : (
                    "no"
                  )}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {order?.arrivalTime ? (
                    <>
                      {new Date(order?.arrivalTime).toISOString().split("T")[0]}{" "}
                      time:
                      {new Date(order?.arrivalTime)
                        .toISOString()
                        .split("T")[1]
                        .slice(0, 2)}
                    </>
                  ) : (
                    "no"
                  )}
                </td>
                <td className="p-3">{order?.shippingAddress?.city}</td>
                <td className="p-3">{order?.shippingAddress?.details}</td>
                <td className="p-3">{order?.shippingAddress?.phone}</td>
                <td className="p-3">{order?.shippingAddress?.postalCode}</td>
                <td className="p-3">{order.totalOrderPrice}</td>
                <tr className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => deliver(order._id)}
                    className="px-2 text-center text-white bg-green-500 py-2"
                  >
                    Delivery done
                  </button>
                  <button
                    onClick={() => setProductShow(order.cartItems)}
                    className="px-2 text-center text-white bg-green-500 py-2"
                  >
                    Show Products
                  </button>
                </tr>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {productShow.length !== 0 && (
        <div className="bg-black bg-opacity-75 flex items-center justify-center fixed top-0 h-full w-full right-0">
          <div className="container  p-4 bg-white rounded-xl">
            <div className="overflow-x-auto w-[95%] md:w-full md:max-w-full">
              <table className="w-full text-center ">
                <thead className="bg-dark text-white">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Product id</th>
                    <th className="p-3">Product Image</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Color</th>
                    <th className="p-3">Size</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productShow.map((product) => (
                    <tr key={product.id}>
                      <td className="p-3">
                        {product?.product?.title_ar}-
                        {product?.product?.title_en}
                      </td>
                      <td
                        className="p-3 hover:text-green-600 transition-all cursor-pointer"
                        onClick={() => onCopy(product?.product._id)}
                      >
                        {product?.product._id}
                      </td>
                      <td className="p-3">
                        <img
                          src={product?.product?.imageCover}
                          className="w-12 mx-auto"
                          alt=""
                        />
                      </td>
                      <td className="p-3">{product.quantity}</td>
                      <td className="p-3">{product.price}</td>
                      <td className="p-3">{product.color}</td>
                      <td className="p-3">{product.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setProductShow([])}
              className="px-8 py-2 rounded-md font-semibold text-white mt-4 block w-fit mx-auto bg-rose-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
