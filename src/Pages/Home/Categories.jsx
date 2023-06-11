import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("https://node-api-v1.onrender.com/api/v1/categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="py-16 container mx-auto">
      <h2 className="heading mb-8">
        <span className="text-2xl">CATEGORIES</span>
      </h2>
      <div className="grid  md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cate) => (
          <Link
            to={`products?category=${cate._id}`}
            key={cate._id}
            className="bg-white p-6 flex items-center py-8 hover:bg-gold transition font-semibold text-dark"
          >
            <div>
              <img src={cate.image} alt="" />
            </div>
            <div>
              <h4>{cate.name}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
