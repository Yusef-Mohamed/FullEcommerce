import { useEffect, useState } from "react";
import logo from "../../images/no-image-icon-0.jpg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { apiRoute } from "../../App";
import React from "react";
function NewCate() {
  const [cateEnName, setCateEnName] = useState(null);
  const [cateArName, setCateArName] = useState(null);
  const [descriptionArName, setDescriptionArName] = useState(null);
  const [descriptionEnName, setDescriptionEnName] = useState(null);
  const [image, setImage] = useState(null);
  const [coverimage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const [type, setType] = useState("");

  const id = useParams().cateId;
  useEffect(() => {
    axios.get(`${apiRoute}/api/v1/categories/${id}`).then((res) => {
      setCateArName(res.data.data.name_ar);
      setCateEnName(res.data.data.name_en);
      setDescriptionArName(res.data.data.description_ar);
      setDescriptionEnName(res.data.data.description_en);
      setType(res.data.data.type);
    });
  }, []);
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
    if (image) {
      formData.append("imageCover", image);
    }
    if (coverimage) {
      formData.append("images", coverimage);
    }

    setLoading(true);
    await axios
      .put(`${apiRoute}/api/v1/categories/${id}`, formData, {
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
      <h2 className="font-semibold text-2xl ">Edit Category</h2>
      <form className="my-5" onSubmit={createBrand}>
        <div>
          <label className="block my-4">Category Name Ar:</label>
          <input
            required
            type="text"
            placeholder="Categorie name"
            value={cateArName}
            minLength={3}
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setCateArName(e.target.value)}
          />
        </div>
        <div>
          <label className="block my-4">Category Name En:</label>
          <input
            value={cateEnName}
            required
            minLength={3}
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
            {type === "men" ? (
              <option selected value="men">
                Men
              </option>
            ) : (
              <option value="men">Men</option>
            )}
            {type === "women" ? (
              <option selected value="women">
                women
              </option>
            ) : (
              <option value="women">women</option>
            )}
          </select>
        </div>
        <div>
          <label className="block my-4">Description Ar:</label>
          <input
            value={descriptionArName}
            required
            minLength={20}
            type="text"
            placeholder="Description name"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setDescriptionArName(e.target.value)}
          />
        </div>
        <div>
          <label className="block my-4">Description En:</label>
          <input
            value={descriptionEnName}
            minLength={20}
            required
            type="text"
            placeholder="Description name"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setDescriptionEnName(e.target.value)}
          />
        </div>
        <div>
          <label className="block my-4">Categorie Image :</label>
          <div className=" flex gap-10 items-center">
            <input
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
            <>Edit</>
          )}
        </button>
      </form>
    </div>
  );
}

export default NewCate;
