import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { apiRoute } from "../../App";
function EditSub() {
  const id = useParams().subId;
  const cateid = useParams().cateid;
  const [mainId, setMainId] = useState(cateid);
  const [err, setErr] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cateEnName, setCateEnName] = useState(null);
  const [cateArName, setCateArName] = useState(null);
  const [descriptionArName, setDescriptionArName] = useState(null);
  const [descriptionEnName, setDescriptionEnName] = useState(null);
  const [image, setImage] = useState(null);
  const [coverimage, setCoverImage] = useState(null);
  const nav = useNavigate();
  let token = localStorage.getItem("token");
  console.log(id);
  const [loading, setLoading] = useState(false);
  //  Git cates For Select
  useEffect(() => {
    axios
      .get(`${apiRoute}/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // Sub Cate Form Main Value
  useEffect(() => {
    axios
      .get(`${apiRoute}/api/v1/subCategories/${id}`, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        setCateEnName(res.data.data.name_en);
        setCateArName(res.data.data.name_ar);
        setDescriptionEnName(res.data.data.description_en);
        setDescriptionArName(res.data.data.description_ar);
      });
  }, []);
  let editCate = async function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_ar", cateArName);
    formData.append("name_en", cateEnName);
    if (mainId) {
      formData.append("category", mainId);
    }
    formData.append("description_ar", descriptionArName);
    formData.append("description_en", descriptionEnName);
    if (image) {
      formData.append("imageCover", image);
    }
    if (coverimage) {
      formData.append("images", coverimage);
    }
    setLoading(true);
    setErr(false);
    await axios
      .put(`${apiRoute}/api/v1/subCategories/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        nav("/dashboard/categories");
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };
  return (
    <div className="p-8 ">
      <h2 className="font-semibold text-2xl ">Edits SubCategorie </h2>
      <form action="" className="my-5" onSubmit={(e) => editCate(e)}>
        <div>
          <label className="block my-4">Category Name Ar:</label>
          <input
            required
            type="text"
            placeholder="Categorie name"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setCateArName(e.target.value)}
            minLength={3}
            value={cateArName}
          />
        </div>
        <div>
          <label className="block my-4">Category Name En:</label>
          <input
            value={cateEnName}
            required
            type="text"
            placeholder="Categorie name"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            minLength={3}
            onChange={(e) => setCateEnName(e.target.value)}
          />
        </div>
        <div>
          <label className="block my-4">Description Ar:</label>
          <input
            required
            value={descriptionArName}
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
            required
            minLength={20}
            type="text"
            placeholder="Description name"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setDescriptionEnName(e.target.value)}
          />
        </div>
        <div>
          <label className="block my-4"> Main Categorie : </label>
          <select
            className=" block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setMainId(e.target.value)}
          >
            {categories.map((cate) => {
              if (useParams().cateid === cate._id) {
                return (
                  <option key={cate._id} value={cate._id} selected>
                    {cate.name_en}-{cate.name_ar}
                  </option>
                );
              } else {
                return (
                  <option key={cate._id} value={cate._id}>
                    {cate.name_en}-{cate.name_ar}
                  </option>
                );
              }
            })}
          </select>
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

export default EditSub;
