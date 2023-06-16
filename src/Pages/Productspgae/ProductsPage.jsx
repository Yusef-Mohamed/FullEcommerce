import { useEffect, useState } from "react";
import Filter from "./Filter";
import axios from "axios";
import Cookies from "universal-cookie";
import ProductCard from "../../Components/ProductCard";

function ProductsPage() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const [agian, setAgian] = useState(0);
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

  useEffect(() => {
    axios
      .get(
        `https://node-api-v1.onrender.com/api/v1/${
          window.location.href.split("/")[
            window.location.href.split("/").length - 1
          ]
        }`
      )
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [agian]);
  // Delete Stars From Link
  const queryParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    queryParams.delete("ratingsAverage[gte]");
    queryParams.delete("price[gte]");
    queryParams.delete("price[lte]");
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, []);
  return (
    <>
      <div className="container grid-cols-12 grid mx-auto gap-4 my-16">
        <div className="col-span-12 md:col-span-4">
          <Filter agian={agian} setAgian={setAgian} />
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {products.map((product) => (
              <div key={product._id}>
                <ProductCard data={product} wish={wishList} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
