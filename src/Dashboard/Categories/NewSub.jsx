import { useState } from "react";
import logo from "../../images/no-image-icon-0.jpg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
function NewSub() {
  const [cateName, setCateName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);
  let cateId = useParams().cateid;

  const nav = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  let createBrand = async function (e) {
    e.preventDefault();
    console.log(cateName);
    setLoading(true);
    await axios
      .post(
        `https://node-api-v1.onrender.com/api/v1/categories/${cateId}/subCategories`,
        { name: cateName },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        nav(`/dashboard/categories/${cateId}/subcate`);
      })
      .catch((err) => setErro(err.response.status));

    setLoading(false);
  };

  return (
    <div className="p-8 ">
      <h2 className="font-semibold text-2xl ">Create SubCategorie</h2>
      <form className="my-5" onSubmit={createBrand}>
        <div>
          <label className="block my-4">SubCategorie Name :</label>
          <input
            required
            type="text"
            placeholder="SubCategorie name"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setCateName(e.target.value)}
          />
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

export default NewSub;
