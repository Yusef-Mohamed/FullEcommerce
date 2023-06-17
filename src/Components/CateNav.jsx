import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CateNav({ data }) {
  const [subCate, setSubCate] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://node-api-v1.onrender.com/api/v1/categories/${data._id}/subCategories`
      )
      .then((res) => {
        setSubCate(res.data.data);
      });
  }, []);

  return (
    <li
      className=""
      onClick={() =>
        document.getElementById(data._id).classList.toggle("cate-on")
      }
      id={data._id}
    >
      <div
        key={data._id}
        className="py-4 cursor-pointer justify-between border-b border-b-white flex items-center "
      >
        {data.name}
        <i className=" fa-solid fa-angles-right mx-2"></i>
      </div>
      <ul className="hidden">
        {subCate.map((sub) => (
          <Link
            to={`/products?category=${data._id}&subcategories=${sub._id}`}
            key={sub._id}
            className="flex items-center transition-colors hover:text-gold"
          >
            {" "}
            <span className="mt-2 mx-2">*</span> {sub.name}
          </Link>
        ))}
      </ul>
    </li>
  );
}

export default CateNav;
