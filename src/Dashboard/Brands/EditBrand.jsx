import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { apiRoute } from "../../App";
function EditBrand() {
  const [brandArName, setBrandArName] = useState("");
  const [brandEnName, setBrandEnName] = useState("");
  const [image, setImage] = useState(null);
  const [err, setErr] = useState(false);

  const [brandData, setBrandData] = useState({});
  const nav = useNavigate();
  let token = localStorage.getItem("token");

  const id = useParams().id;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`${apiRoute}/api/v1/brands/${id}`, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setBrandData(res.data.data);
        setBrandArName(res.data.data.name_ar);
        setBrandEnName(res.data.data.name_en);
        console.log(res.data.data.name);
      });
  }, []);
  let createBrand = async function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_ar", brandArName);
    formData.append("name_en", brandEnName);
    if (image) {
      formData.append("image", image);
    }
    setLoading(true);
    setErr(false);
    await axios
      .put(`${apiRoute}/api/v1/brands/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        nav("/dashboard/brands");
      })
      .catch((err) => console.log(err));

    setLoading(false);
  };
  return (
    <div className="p-8 ">
      <h2 className="font-semibold text-2xl ">Edits Brand</h2>
      <form action="" className="my-5" onSubmit={(e) => createBrand(e)}>
        <div>
          <label className="block my-4">Brand Name Ar:</label>
          <input
            type="text"
            placeholder="Brand name"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            value={brandArName}
            required
            onChange={(e) => setBrandArName(e.target.value)}
          />
        </div>
        <div>
          <label className="block my-4">Brand Name En:</label>
          <input
            type="text"
            placeholder="Brand name"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            value={brandEnName}
            required
            onChange={(e) => setBrandEnName(e.target.value)}
          />
        </div>
        <div>
          <label className="block my-4">Brand Image :</label>
          <div className=" flex gap-10 items-center">
            <input
              type="file"
              placeholder="Brand name"
              className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
              onChange={(e) => setImage(e.target.files.item(0))}
            />
            <div className="w-32 h-32 bg-gray-600">
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  className="w-32 h-32 block object-contain"
                  alt=""
                />
              )}
              {!image && (
                <img
                  src={brandData.image}
                  className="w-32 h-32 block object-contain"
                  alt={brandData.name}
                />
              )}
            </div>
          </div>
        </div>
        {err && (
          <p className="text-red-500 my-2">Please enter brand Name and Image</p>
        )}
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

export default EditBrand;
