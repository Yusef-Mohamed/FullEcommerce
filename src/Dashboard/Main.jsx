import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function Main() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("https://node-api-v1.onrender.com/api/v1/orders", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setOrders(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className=" md:p-8 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-2xl ">Main Section</h2>
      <h2 className="font-semibold text-xl ">Main Section</h2>

      <div className="overflow-x-auto max-w-[80%] md:w-full md:max-w-full">
        <table className="w-full">
          <thead className="bg-dark text-white">
            <tr>
              <th className="p-3">Owner Name</th>
              <th className="p-3">Paid</th>
              <th className="p-3">Delivered</th>
              <th className="p-3">Total Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="p-3">{order.user.name}</td>
                <td className="p-3">{order.isPaid ? "yes" : "no"}</td>
                <td className="p-3">{order.isDelivered ? "yes" : "no"}</td>
                <td className="p-3">{order.totalOrderPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Main;
