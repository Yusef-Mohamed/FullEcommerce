import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { apiRoute } from "../../App";
import React from "react";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [ref, setRef] = useState(0);
  let token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(4);
  // Get categories
  useEffect(() => {
    axios
      .get(`${apiRoute}/api/v1/categories?page=${currentPage}`)
      .then((res) => {
        setPages(res.data.paginationResult.numberOfPages);
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [ref, currentPage]);

  const deletee = function (id) {
    axios
      .delete(`${apiRoute}/api/v1/categories/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => setRef((prev) => prev + 1))
      .catch((err) => console.log(err.response));
  };
  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-2xl mb-8">Categories Section</h2>

      <div className="overflow-x-auto whitespace-nowrap w-[90%] md:w-full md:max-w-full">
        <table className="w-full">
          <thead className="bg-dark text-white ">
            <th className="py-3 px-1 md:p-3">Name</th>
            <th className="py-3 px-1 md:p-3">image</th>
            <th className="py-3 px-1 md:p-3">imageCover</th>
            <th className="py-3 px-1 md:p-3">Actions</th>
          </thead>
          <tbody>
            {categories.map((categorie) => (
              <tr
                key={categorie.id}
                className="text-center odd:bg-gray-100 my-2"
              >
                <td>
                  {categorie.name_ar} <br />
                  {categorie.name_en}
                </td>

                <td>
                  <img
                    src={categorie.images[0]}
                    className="w-16 h-16 object-contain mx-auto  "
                  />
                </td>
                <td>
                  <img
                    src={categorie.imageCover}
                    className="w-16 h-16 object-contain mx-auto  "
                  />
                </td>
                <td className="flex h-full items-center justify-center">
                  <button
                    className="btn  bg-red-500 text-white p-2  w-full "
                    onClick={() => deletee(categorie._id)}
                  >
                    delete
                  </button>
                  <Link
                    to={`edit/${categorie._id}`}
                    className="btn  bg-green-500 text-white p-2 w-full"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`${categorie._id}/subcate`}
                    className="btn bg-yellow-500 text-white p-2  w-full "
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
      {pages > 1 && (
        <div className="flex items-center border border-slate-300 w-fit  my-4 mx-auto">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="block px-8 text-center py-4 disabled:bg-gray-300 bg-green-500 disabled:cursor-not-allowed text-white"
          >
            Prev
          </button>
          <button className="block px-8 text-center py-4">{currentPage}</button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === pages}
            className="block px-8 text-center py-4 disabled:bg-gray-300 disabled:cursor-not-allowed bg-green-500 text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Categories;
