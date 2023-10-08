import { useState } from "react";
import logo from "../../images/no-image-icon-0.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { apiRoute } from "../../App";
import React from "react";
function NewCate() {
  const [cateEnName, setCateEnName] = useState(null);
  const [cateArName, setCateArName] = useState(null);
  const [type, setType] = useState("");
  const [descriptionArName, setDescriptionArName] = useState(null);
  const [descriptionEnName, setDescriptionEnName] = useState(null);
  const [image, setImage] = useState(null);
  const [coverimage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);

  const nav = useNavigate();
  let token = localStorage.getItem("token");

  let createBrand = async function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_ar", cateArName);
    formData.append("type", type);
    formData.append("name_en", cateEnName);
    formData.append("description_ar", descriptionArName);
    formData.append("description_en", descriptionEnName);
    formData.append("imageCover", image);
    formData.append("images", coverimage);

    setLoading(true);
    await axios
      .post(`${apiRoute}/api/v1/categories`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        nav("/dashboard/categories");
      })
      .catch((err) => {
        console.log(err);
        setErro(err.response.status);
      });

    setLoading(false);
  };

  return (
    <div className="p-8 ">
      <h2 className="font-semibold text-2xl ">Create Categorie</h2>
      <form className="my-5" onSubmit={createBrand}>
        <div>
          <label className="block my-4">Category Name Ar:</label>
          <input
            required
            minLength={3}
            type="text"
            placeholder="Categorie name"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setCateArName(e.target.value)}
          />
        </div>
        <div>
          <label className="block my-4">Category Name En:</label>
          <input
            minLength={3}
            required
            type="text"
            placeholder="Categorie name"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setCateEnName(e.target.value)}
          />
        </div>
        <div>
          <label className="block my-4">Type:</label>
          <select
            required
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled selected>
              Type
            </option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>
        <div>
          <label className="block my-4">Description Ar:</label>
          <input
            required
            type="text"
            placeholder="Description name"
            minLength={20}
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setDescriptionArName(e.target.value)}
          />
        </div>
        <div>
          <label className="block my-4">Description En:</label>
          <input
            required
            type="text"
            placeholder="Description name"
            minLength={20}
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setDescriptionEnName(e.target.value)}
          />
        </div>

        <div>
          <label className="block my-4">Categorie Image :</label>
          <div className=" flex gap-10 items-center">
            <input
              required
              type="file"
              placeholder="Categorie name"
              className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
              onChange={(e) => setImage(e.target.files.item(0))}
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                className="w-32 h-32 block object-contain"
                alt=""
              />
            )}
            {!image && <div className="w-32 h-32 bg-gray-600"></div>}
          </div>
        </div>
        <div>
          <label className="block my-4">Categorie Cover Image :</label>
          <div className=" flex gap-10 items-center">
            <input
              required
              type="file"
              placeholder="Categorie name"
              className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
              onChange={(e) => setCoverImage(e.target.files.item(0))}
            />
            {coverimage && (
              <img
                src={URL.createObjectURL(coverimage)}
                className="w-32 h-32 block object-contain"
                alt=""
              />
            )}
            {!coverimage && <div className="w-32 h-32 bg-gray-600"></div>}
          </div>
        </div>
        {erro == 500 && <p className="text-red-500">Name is Already used</p>}
        <button
          type="submit"
          className="btn text-gold bg-dark px-10 p-2 mx-auto"
        >
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
          ) : (
            <>Create</>
          )}
        </button>
      </form>
    </div>
  );
}

export default NewCate;
