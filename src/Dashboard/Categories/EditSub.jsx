import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
function EditSub() {
  const [cateName, setCateName] = useState(null);
  const id = useParams().subId;
  const [mainId, setMainId] = useState(id);
  const [err, setErr] = useState(false);
  const [categories, setCategories] = useState([]);

  const nav = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const [loading, setLoading] = useState(false);
  //  Git cates For Select
  useEffect(() => {
    axios
      .get("https://node-api-v1.onrender.com/api/v1/categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // Sub Cate Form Main Value
  useEffect(() => {
    axios
      .get(
        `https://node-api-v1.onrender.com/api/v1/subCategories/${id}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setCateName(res.data.data.name);
      });
  }, []);
  let editCate = async function (e) {
    e.preventDefault();

    setLoading(true);
    setErr(false);
    await axios
      .put(
        `https://node-api-v1.onrender.com/api/v1/subCategories/${id}`,
        {
          name: cateName,
          category: mainId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
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
          <label className="block my-4">SubCategorie Name :</label>
          <input
            type="text"
            placeholder="Brand name"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            value={cateName}
            required
            onChange={(e) => setCateName(e.target.value)}
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
                    {cate.name}
                  </option>
                );
              } else {
                return (
                  <option key={cate._id} value={cate._id}>
                    {cate.name}
                  </option>
                );
              }
            })}
          </select>
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
