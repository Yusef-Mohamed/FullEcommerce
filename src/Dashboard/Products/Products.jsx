import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { apiRoute } from "../../App";
import React from "react";
function Products() {
  const [products, setProducts] = useState([]);
  const [ref, setRef] = useState(0);
  let token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const keyWord = useRef(null);
  const [brands, setBrands] = useState([]);
  const [shosenBrand, setShosenBrands] = useState("");
  const [categories, setCaregories] = useState([]);
  const [shosenCaregory, setShosenCaregory] = useState("");
  const [pages, setPages] = useState(0);
  // Get Brands
  useEffect(() => {
    axios
      .get(
        `${apiRoute}/api/v1/products?page=${currentPage}${
          shosenBrand && `&brand=${shosenBrand}`
        }${shosenCaregory && `&category=${shosenCaregory}`}${
          keyWord.current.value && `&keyword=${keyWord.current.value}`
        }`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setPages(res.data.paginationResult.numberOfPages);
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [ref, currentPage]);
  useEffect(() => {
    axios
      .get(`${apiRoute}/api/v1/brands`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setBrands(res.data.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiRoute}/api/v1/categories`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCaregories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deletee = function (id) {
    axios
      .delete(`${apiRoute}/api/v1/products/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => setRef((prev) => prev + 1))
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-4 flex flex-col  items-start whitespace-nowrap">
      <h2 className="font-semibold text-2xl w-full text-center mb-8">
        Products Section
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCurrentPage(1);
          setRef((prev) => prev + 1);
        }}
        className="my-4"
      >
        <h3 className="text-xl">Filters</h3>
        <div className="formInput my-4">
          <label className="block text-lg mb-3">Keyword:</label>
          <input
            ref={keyWord}
            className="bg-white border px-4 py-2 rounded-2xl w-full"
          />
        </div>
        <div className="formInput my-4">
          <label className="block text-lg mb-3">Brand:</label>
          <select
            onClick={(e) => setShosenBrands(e.target.value)}
            className="bg-white border px-4 py-2 rounded-2xl w-full"
          >
            <option value="" selected disabled>
              Brand
            </option>
            {brands.map((brand) => (
              <option value={brand._id} key={brand._id}>
                {brand.name_ar}-{brand.name_en}
              </option>
            ))}
          </select>
        </div>
        <div className="formInput my-4">
          <label className="block text-lg mb-3">Category:</label>
          <select
            onClick={(e) => setShosenCaregory(e.target.value)}
            className="bg-white border px-4 py-2 rounded-2xl w-full"
          >
            <option selected disabled>
              Category
            </option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name_ar}-{category.name_en}
              </option>
            ))}
          </select>
        </div>
        <button className="bg-dark text-gold border px-4 py-2 rounded-2xl w-full">
          filter
        </button>
      </form>
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
                <td>
                  {product.title_ar}
                  <br />
                  {product.title_en}
                </td>
                <td>
                  {product.category?.name_ar}-{product.category?.name_en}
                </td>
                <td>{product.price}</td>
                <td>{product.sold}</td>
                <td>{product.quantity}</td>
                <td>
                  <button
                    className="btn  bg-red-500 text-white p-2 mr-2 w-20"
                    onClick={() => deletee(product._id)}
                  >
                    delete
                  </button>
                  <Link
                    to={`edit/${product._id}`}
                    className="btn  bg-green-500 text-white p-2  w-20"
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

export default Products;
