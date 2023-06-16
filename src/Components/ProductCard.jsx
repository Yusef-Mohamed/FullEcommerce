import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { CounterContext } from "../Pages/ShopPages";
import { toast } from "react-toastify";

function ProductCard({ data, wish }) {
  const counter = useContext(CounterContext);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const handelWish = function (e) {
    if (e.target.classList.contains("on")) {
      axios
        .delete(
          `https://node-api-v1.onrender.com/api/v1/wishlist/${data._id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          counter.setCounter((prev) => prev + 1);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(
          `https://node-api-v1.onrender.com/api/v1/wishlist`,
          { productId: data._id },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          counter.setCounter((prev) => prev + 1);
        })
        .catch((err) => {
          console.log(err.response.status);
          if (err.response.status == 401) {
            toast.error("You must login before add items to wish list");
          }
        });
    }
    e.target.classList.toggle("on");
  };
  return (
    <div className="block rounded-lg relative bg-gray-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <i
        className={`fa-solid fa-heart wish absolute top-4 right-4 transition ${
          wish.includes(data._id) && "on"
        }`}
        onClick={(e) => handelWish(e)}
      ></i>
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <img className="rounded-t-lg" src={data.imageCover} alt="" />
        <a href="#!">
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
        </a>
      </div>
      <div className="p-6">
        <Link
          to={`/product/${data._id}`}
          className="mb-2 text-xl text-dark font-medium hover:text-gold transition line-clamp-2 overflow-hidden"
        >
          {data.title}
        </Link>
        <div className="text-dark text-xl text-center py-4">
          {data.priceAfterDiscount ? (
            <>
              <span className="mr-3">${data.priceAfterDiscount}</span>
              <span className="line-through">${data.price}</span>
            </>
          ) : (
            <span>${data.price}</span>
          )}
        </div>
        <div className="text-dark text-center text-lg">
          {data.ratingsQuantity === 0 && "No Rating "}
          {data.ratingsAverage && (
            <>
              {[...Array(Math.floor(data.ratingsAverage))].map((_, index) => (
                <i key={index} className="fa-solid fa-star text-gold"></i>
              ))}
              {data.ratingsAverage % 1 !== 0 && (
                <span className="relative">
                  <i className="fa-solid fa-star-half text-gold absolute top-0 left-0"></i>
                  <i className="fa-solid fa-star-half text-dark fa-flip-horizontal  "></i>
                </span>
              )}
              {[...Array(5 - Math.ceil(data.ratingsAverage))].map(
                (_, index) => (
                  <i
                    key={index + Math.ceil(data.ratingsAverage)}
                    className="fa-solid fa-star text-dark"
                  ></i>
                )
              )}
              ({data.ratingsQuantity})
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
