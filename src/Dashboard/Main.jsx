import axios from "axios";
import React, { useEffect, useState } from "react";

import { apiRoute } from "../App";

function Main() {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [reff, setRef] = useState(0);
  useEffect(() => {
    axios
      .get(`${apiRoute}/api/v1/orders`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setOrders(res.data.data);
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
  return (
    <div className=" md:p-8 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-2xl ">Orders</h2>

      <div className="overflow-x-auto w-[95%] md:w-full md:max-w-full">
        <table className="w-full text-center">
          <thead className="bg-dark text-white">
            <tr>
              <th className="p-3">Owner Name</th>
              <th className="p-3">Paid</th>
              <th className="p-3">Delivered</th>
              <th className="p-3">Total Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="p-3">{order?.user?.name}</td>
                <td className="p-3">{order.isPaid ? "yes" : "no"}</td>
                <td className="p-3">{order.isDelivered ? "yes" : "no"}</td>
                <td className="p-3">{order.totalOrderPrice}</td>
                <tr>
                  <button
                    onClick={() => deliver(order._id)}
                    className="px-2 text-center text-white bg-green-500 py-2"
                  >
                    Delivery done
                  </button>
                </tr>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Main;
