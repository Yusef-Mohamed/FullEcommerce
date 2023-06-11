import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [ref, setRef] = useState(0);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  // Get Brands
  useEffect(() => {
    axios
      .get("https://node-api-v1.onrender.com/api/v1/coupons", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setCoupons(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [ref]);

  const deletee = function (id) {
    axios
      .delete(`https://node-api-v1.onrender.com/api/v1/coupons/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => setRef((prev) => prev + 1))
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-2xl mb-8">Coupons Section</h2>

      <div className="overflow-x-auto w-[90%] md:w-full md:max-w-full">
        <table className="w-full">
          <thead className="bg-dark text-white ">
            <th className="py-3 px-1 md:p-3">Name</th>
            <th className="py-3 px-1 md:p-3">Discount</th>
            <th className="py-3 px-1 md:p-3">Expire</th>
            <th className="py-3 px-1 md:p-3">Actions</th>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="text-center odd:bg-gray-100 my-2">
                <td>{coupon.name}</td>
                <td>{coupon.discount}</td>
                <td>{coupon.expire.slice(0, 10)}</td>
                <td>
                  <button
                    className="md:btn text-red-500 md:bg-red-500 md:text-white md:p-2 mr-2 md:w-20"
                    onClick={() => deletee(coupon._id)}
                  >
                    delete
                  </button>
                  <Link
                    to={`edit/${coupon._id}`}
                    className="md:btn text-green-500 md:bg-green-500 md:text-white md:p-2  md:w-20"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        className="w-3/4 btn bg-dark text-gold p-3 text-center mt-8"
        to="newcoupon"
      >
        Create new Coupon
      </Link>
    </div>
  );
}

export default Coupons;
