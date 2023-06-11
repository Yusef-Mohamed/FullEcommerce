import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function Brand() {
  const [brands, setBrands] = useState([]);
  const [ref, setRef] = useState(0);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  // Get Brands
  useEffect(() => {
    axios
      .get("https://node-api-v1.onrender.com/api/v1/brands")
      .then((res) => setBrands(res.data.data))
      .catch((err) => console.log(err));
  }, [ref]);

  const deletee = function (id) {
    axios
      .delete(`https://node-api-v1.onrender.com/api/v1/brands/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => setRef((prev) => prev + 1))
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-8 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-2xl mb-8">Brands Section</h2>

      <div className="overflow-x-auto w-full md:max-w-full">
        <table className="w-full">
          <thead className="bg-dark text-white ">
            <th className="p-3">Name</th>
            <th className="p-3">Image</th>
            <th className="p-3">Actions</th>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id} className="text-center odd:bg-gray-100 my-2">
                <td>{brand.name}</td>
                <td>
                  <img
                    src={brand.image}
                    className="w-16 h-16 object-contain mx-auto  "
                  />
                </td>
                <td>
                  <button
                    className="md:btn text-red-500 md:bg-red-500 md:text-white md:p-2 mr-2 md:w-20"
                    onClick={() => deletee(brand._id)}
                  >
                    delete
                  </button>
                  <Link
                    to={`edit/${brand._id}`}
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
        to="newbrand"
      >
        Create new Brand
      </Link>
    </div>
  );
}

export default Brand;
