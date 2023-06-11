import axios from "axios";
import ProductCard from "../../Components/ProductCard";
import { useEffect, useState } from "react";

import Cookies from "universal-cookie";
function Products() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const [products, setProducts] = useState([]);
  const [wishList, setWishList] = useState([]);
  // get wishList
  useEffect(() => {
    axios
      .get(`https://node-api-v1.onrender.com/api/v1/users/getMe`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setWishList(res.data.data.wishlist);
      })
      .catch((err) => console.log(err));
  }, []);
  // get products
  useEffect(() => {
    axios
      .get("https://node-api-v1.onrender.com/api/v1/products", {})
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container mx-auto">
      <h2 className="heading mb-8">
        <span className="text-2xl">PRODUCTS</span>
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {products.map((product) => (
          <div key={product._id}>
            <ProductCard data={product} wish={wishList} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
