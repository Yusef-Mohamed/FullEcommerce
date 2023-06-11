import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
function EditCate() {
  const [cateName, setCateName] = useState(null);
  const [image, setImage] = useState(null);
  const [err, setErr] = useState(false);

  const [cateData, setCatadata] = useState({});
  const nav = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const id = useParams().cateId;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`https://node-api-v1.onrender.com/api/v1/categories/${id}`, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCatadata(res.data.data);
        setCateName(res.data.data.name);
      });
  }, []);
  let editCate = async function (e) {
    e.preventDefault();
    const formData = new FormData();

    if (cateName || image) {
      if (image) {
        formData.append("image", image);
      }
      if (cateName) {
        formData.append("name", cateName);
      }
      setLoading(true);
      setErr(false);
      await axios
        .put(
          `https://node-api-v1.onrender.com/api/v1/categories/${id}`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          nav("/dashboard/categories");
        })
        .catch((err) => console.log(err));
    } else {
      setErr(true);
    }
    setLoading(false);
  };
  return (
    <div className="p-8 ">
      <h2 className="font-semibold text-2xl ">Edits Categorie </h2>
      <form action="" className="my-5">
        <div>
          <label className="block my-4">Categorie Name :</label>
          <input
            type="text"
            placeholder="Categorie name"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            value={cateName}
            onChange={(e) => setCateName(e.target.value)}
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
                  src={cateData.image}
                  className="w-32 h-32 block object-contain"
                  alt={cateData.name}
                />
              )}
            </div>
          </div>
        </div>
        {err && (
          <p className="text-red-500 my-2">
            Please enter Categorie Name or Image
          </p>
        )}
        <button
          type="submit"
          onClick={(e) => editCate(e)}
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

export default EditCate;
