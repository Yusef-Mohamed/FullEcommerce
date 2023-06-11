import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function Products() {
  const [products, setProducts] = useState([]);
  const [ref, setRef] = useState(0);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  // Get Brands
  useEffect(() => {
    axios
      .get("https://node-api-v1.onrender.com/api/v1/products", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [ref]);

  const deletee = function (id) {
    axios
      .delete(`https://node-api-v1.onrender.com/api/v1/products/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => setRef((prev) => prev + 1))
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-4 flex flex-col  items-start">
      <h2 className="font-semibold text-2xl w-full text-center mb-8">
        Products Section
      </h2>

      <div className="overflow-x-auto w-[90%] md:w-full md:max-w-full flex justify-start">
        <table className="w-full">
          <thead className="bg-dark text-white ">
            <th className="py-3 px-1 md:p-3">Title</th>
            <th className="py-3 px-1 md:p-3">Main Cate</th>
            <th className="py-3 px-1 md:p-3">Price</th>
            <th className="py-3 px-1 md:p-3">Sold</th>
            <th className="py-3 px-1 md:p-3">Quantity</th>
            <th className="py-3 px-1 md:p-3">Actions</th>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="text-center odd:bg-gray-100 my-2">
                <td>{product.title}</td>
                <td>{product.category.name}</td>
                <td>{product.price}</td>
                <td>{product.sold}</td>
                <td>{product.quantity}</td>
                <td>
                  <button
                    className="md:btn text-red-500 md:bg-red-500 md:text-white md:p-2 mr-2 md:w-20"
                    onClick={() => deletee(product._id)}
                  >
                    delete
                  </button>
                  <Link
                    to={`edit/${product._id}`}
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
        className="w-3/4 btn bg-dark text-gold p-3 text-center mx-auto block mt-8"
        to="newproduct"
      >
        Add edit Product
      </Link>
    </div>
  );
}

export default Products;
