import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function Users() {
  const [users, setUsers] = useState([]);
  const [ref, setRef] = useState(0);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  // Get Brands
  useEffect(() => {
    axios
      .get("https://node-api-v1.onrender.com/api/v1/users", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [ref]);

  const deletee = function (id) {
    axios
      .delete(`https://node-api-v1.onrender.com/api/v1/users/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => setRef((prev) => prev + 1))
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-4 flex flex-col justify-center ">
      <h2 className="font-semibold text-2xl w-full text-center mb-8">
        Users Section
      </h2>

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
                <td>
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
    </div>
  );
}

export default Users;
