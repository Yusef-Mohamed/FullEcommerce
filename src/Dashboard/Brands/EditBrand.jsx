import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
function EditBrand() {
  const [brandName, setBrandName] = useState(null);
  const [image, setImage] = useState(null);
  const [err, setErr] = useState(false);

  const [brandData, setBrandData] = useState({});
  const nav = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const id = useParams().id;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`https://node-api-v1.onrender.com/api/v1/brands/${id}`, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setBrandData(res.data.data);
        setBrandName(res.data.data.name);
        console.log(res.data.data.name);
      });
  }, []);
  let createBrand = async function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", brandName);
    formData.append("image", image);
    if (brandName && image) {
      setLoading(true);
      setErr(false);
      await axios
        .put(`https://node-api-v1.onrender.com/api/v1/brands/${id}`, formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res);
          nav("/dashboard/brands");
        })
        .catch((err) => console.log(err));
    } else {
      setErr(true);
    }
    setLoading(false);
  };
  return (
    <div className="p-8 ">
      <h2 className="font-semibold text-2xl ">Edits Brand</h2>
      <form action="" className="my-5">
        <div>
          <label className="block my-4">Brand Name :</label>
          <input
            type="text"
            placeholder="Brand name"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
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
          onClick={(e) => createBrand(e)}
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
