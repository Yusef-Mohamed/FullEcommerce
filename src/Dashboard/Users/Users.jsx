import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { apiRoute } from "../../App";

function Users() {
  const [users, setUsers] = useState([]);
  const [ref, setRef] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  let token = localStorage.getItem("token");

  // Get Brands
  useEffect(() => {
    axios
      .get(`${apiRoute}/api/v1/users?page=${currentPage}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setPages(res.data.paginationResult.numberOfPages);
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [ref, currentPage]);

  const deletee = function (id) {
    axios
      .delete(`${apiRoute}/api/v1/users/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => setRef((prev) => prev + 1))
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-4 flex flex-col justify-center overflow-hidden ">
      <h2 className="font-semibold text-2xl text-center mb-8">Users Section</h2>

      <div className="overflow-x-auto w-[80%] md:w-full md:max-w-full">
        <table className="w-full">
          <thead className="bg-dark text-white ">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center odd:bg-gray-100 my-2">
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="flex">
                  <button
                    className="btn bg-red-500 text-white p-2 mr-2 w-20"
                    onClick={() => deletee(user._id)}
                  >
                    delete
                  </button>
                  <Link
                    to={`edit/${user._id}`}
                    className="btn bg-green-500 text-white p-2  w-20"
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
        className="w-3/4 btn bg-dark text-gold p-3 text-center block mx-auto mt-8"
        to="newuser"
      >
        Create new user
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

export default Users;
