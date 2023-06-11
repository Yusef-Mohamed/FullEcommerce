import { useState } from "react";
import logo from "../../images/no-image-icon-0.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
function NewCate() {
  const [cateName, setCateName] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);

  const nav = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  let createBrand = async function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", cateName);
    formData.append("image", image);

    setLoading(true);
    await axios
      .post(`https://node-api-v1.onrender.com/api/v1/categories`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        nav("/dashboard/categories");
      })
      .catch((err) => setErro(err.response.status));

    setLoading(false);
  };

  return (
    <div className="p-8 ">
      <h2 className="font-semibold text-2xl ">Create Categorie</h2>
      <form className="my-5" onSubmit={createBrand}>
        <div>
          <label className="block my-4">Categorie Name :</label>
          <input
            required
            type="text"
            placeholder="Categorie name"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setCateName(e.target.value)}
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
                  src={logo}
                  className="w-32 h-32 block object-contain"
                  alt=""
                />
              )}
            </div>
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
