import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [ref, setRef] = useState(0);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  // Get categories
  useEffect(() => {
    axios
      .get("https://node-api-v1.onrender.com/api/v1/categories")
      .then((res) => {
        console.log(res.data.data);
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [ref]);

  const deletee = function (id) {
    axios
      .delete(`https://node-api-v1.onrender.com/api/v1/categories/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => setRef((prev) => prev + 1))
      .catch((err) => console.log(err.response));
  };
  return (
    <div className="p-8 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-2xl mb-8">Categories Section</h2>

      <div className="overflow-x-auto w-[90%] md:w-full md:max-w-full">
        <table className="w-full">
          <thead className="bg-dark text-white ">
            <th className="py-3 px-1 md:p-3">Name</th>
            <th className="py-3 px-1 md:p-3">image</th>
            <th className="py-3 px-1 md:p-3">Actions</th>
          </thead>
          <tbody>
            {categories.map((categorie) => (
              <tr
                key={categorie.id}
                className="text-center odd:bg-gray-100 my-2"
              >
                <td>{categorie.name}</td>
                <td>
                  <img
                    src={categorie.image}
                    className="w-16 h-16 object-contain mx-auto  "
                  />
                </td>
                <td className="flex flex-col">
                  <button
                    className="md:btn text-red-500 md:bg-red-500 md:text-white md:p-2 mr-2 md:w-20"
                    onClick={() => deletee(categorie._id)}
                  >
                    delete
                  </button>
                  <Link
                    to={`edit/${categorie._id}`}
                    className="md:btn text-green-500 md:bg-green-500 md:text-white md:p-2  md:w-20"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`${categorie._id}/subcate`}
                    className="md:btn text-yellow-500 md:bg-yellow-500 md:text-white md:p-2 mr-2 md:w-20"
                  >
                    SubCategories
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        className="w-3/4 btn bg-dark text-gold p-3 text-center mt-8"
        to="newcategorie"
      >
        Create new Categorie
      </Link>
    </div>
  );
}

export default Categories;
