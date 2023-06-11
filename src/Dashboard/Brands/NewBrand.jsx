import { useState } from "react";
import logo from "../../images/no-image-icon-0.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
function NewBrand() {
  const [brandName, setBrandName] = useState(null);
  const [image, setImage] = useState(null);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  let createBrand = async function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", brandName);
    formData.append("image", image);

    setLoading(true);
    await axios
      .post(`https://node-api-v1.onrender.com/api/v1/brands`, formData, {
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
      <h2 className="font-semibold text-2xl ">Create Brand</h2>
      <form className="my-5" onSubmit={createBrand}>
        <div>
          <label className="block my-4">Brand Name :</label>
          <input
            required
            type="text"
            placeholder="Brand name"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setBrandName(e.target.value)}
          />
        </div>
        <div>
          <label className="block my-4">Brand Image :</label>
          <div className=" flex gap-10 items-center">
            <input
              required
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
                  src={logo}
                  className="w-32 h-32 block object-contain"
                  alt=""
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
            <>Create</>
          )}
        </button>
      </form>
    </div>
  );
}

export default NewBrand;
