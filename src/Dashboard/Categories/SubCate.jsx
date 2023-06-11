import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import Categories from "./Categories";

function SubCate() {
  const [categories, setCategories] = useState([]);
  const [ref, setRef] = useState(0);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const [cateName, setCateName] = useState(null);

  let cateId = useParams().cateid;

  //   Get Categorie Name
  useEffect(() => {
    axios
      .get(
        `https://node-api-v1.onrender.com/api/v1/categories/${cateId}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setCateName(res.data.data.name);
      });
  }, []);

  // Get Subcategories
  useEffect(() => {
    axios
      .get(
        `https://node-api-v1.onrender.com/api/v1/categories/${cateId}/subCategories`
      )
      .then((res) => {
        console.log(res.data.data);
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [ref]);

  const deletee = function (id) {
    axios
      .delete(`https://node-api-v1.onrender.com/api/v1/subCategories/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => setRef((prev) => prev + 1))
      .catch((err) => console.log(err.response));
  };
  return (
    <div className="p-8 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-2xl ">
        {cateName} SubCategories Section
      </h2>
      <table className="w-full my-10">
        <thead className="bg-dark text-white ">
          <th className="p-3">Name</th>
          <th className="p-3">Actions</th>
        </thead>
        <tbody>
          {categories.map((categorie) => (
            <tr key={categorie.id} className="text-center odd:bg-gray-100 my-2">
              <td>{categorie.name}</td>
              <td>
                <button
                  className="btn bg-red-500 text-white p-2 mr-2 w-20"
                  onClick={() => deletee(categorie._id)}
                >
                  delete
                </button>
                <Link
                  to={`edit/${categorie._id}`}
                  className="btn bg-green-500 text-white p-2  w-20"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        className="w-3/4 btn bg-dark text-gold p-3 text-center my-5"
        to="newsubcate"
      >
        Create new SubCategorie
      </Link>
    </div>
  );
}

export default SubCate;
