import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router";
import { Carousel, initTE } from "tw-elements";
import Reviews from "./Reviews";
import Cookies from "universal-cookie";
import { CounterContext } from "../ShopPages";
import { toast } from "react-toastify";
function Product() {
  initTE({ Carousel });
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const [color, setColor] = useState("");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [incart, setInCart] = useState("");
  const id = useParams().id;
  const counter = useContext(CounterContext);
  useEffect(() => {
    let getProduct = async function () {
      await axios
        .get(`https://node-api-v1.onrender.com/api/v1/products/${id}`)
        .then((res) => {
          setProduct(res.data.data);
          getCart(res.data.data._id);
        });
    };
    let getCart = async function (data) {
      await axios
        .get("https://node-api-v1.onrender.com/api/v1/cart", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          IsInCart(data, res.data.data.cartItems);
        })

        .catch((err) => console.log(err));
    };
    let IsInCart = function (data, arr) {
      arr.map((e) => {
        if (e.product._id === data) {
          setInCart(e._id);
        }
      });
    };
    getProduct();
  }, [counter.counter]);

  // Cart
  // Check if the product in cart

  const addToCart = function (e) {
    e.preventDefault();
    setLoading(true);
    if (color) {
      axios
        .post(
          `https://node-api-v1.onrender.com/api/v1/cart`,
          {
            productId: product._id,
            color: color,
          },
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
          console.log(err);
          if (err.response.status == 401) {
            toast.error("You must login before add items to Shoping Cart");
          }
        })
        .finally(() => setLoading(false));
    } else {
      axios
        .post(
          `https://node-api-v1.onrender.com/api/v1/cart`,
          {
            productId: product._id,
          },
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
          console.log(err);
          if (err.response.status == 401) {
            toast.error("You must login before add items to Shoping Cart");
          }
        })
        .finally(() => setLoading(false));
    }
  };
  console.log(incart);
  const remove = function () {
    setLoading(true);
    axios
      .delete(`https://node-api-v1.onrender.com/api/v1/cart/${incart}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        counter.setCounter((prev) => prev + 1);
        setInCart("");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div className="container mx-auto py-12">
        <div className="lg:flex gap- mb-8">
          <div className="lg:w-5/12">
            <div
              id="carouselExampleCaptions"
              className="relative"
              data-te-carousel-init
              data-te-carousel-slide
            >
              {/*Carousel indicators*/}
              <div
                className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
                data-te-carousel-indicators
              >
                <button
                  type="button"
                  data-te-target="#carouselExampleCaptions"
                  data-te-slide-to={0}
                  data-te-carousel-active
                  className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-solid border-transparent bg-black border-white border bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                  aria-current="true"
                  aria-label="Slide 1"
                />
                {product.images &&
                  product.images.map((ele, index) => (
                    <button
                      key={index}
                      type="button"
                      data-te-target="#carouselExampleCaptions"
                      data-te-slide-to={index + 1}
                      className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-solid border-transparent bg-black border-white border bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                      aria-label="Slide 2"
                    />
                  ))}
              </div>
              {/*Carousel items*/}
              <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                {/*First item*/}
                <div
                  className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                  data-te-carousel-active
                  data-te-carousel-item
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={product.imageCover}
                    className="block w-full"
                    alt="..."
                  />
                </div>
                {product.images &&
                  product.images.map((ele, index) => (
                    <div
                      key={index}
                      className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                      data-te-carousel-item
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <img src={ele} className="block w-full" alt="..." />
                    </div>
                  ))}
              </div>
              {/*Carousel controls - prev item*/}
              <button
                className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]  hover:no-underline hover:opacity-90 hover:outline-none  focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                type="button"
                data-te-target="#carouselExampleCaptions"
                data-te-slide="prev"
              >
                <span className="inline-block h-8 w-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </span>
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Previous
                </span>
              </button>
              {/*Carousel controls - next item*/}
              <button
                className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black  opacity-100 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]  hover:no-underline hover:opacity-90 hover:outline-none focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                type="button"
                data-te-target="#carouselExampleCaptions"
                data-te-slide="next"
              >
                <span className="inline-block h-8 w-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Next
                </span>
              </button>
            </div>
          </div>
          <div className="lg:w-7/12 p-8 bg-white">
            <h2 className="t  text-xl font-medium">{product.title}</h2>
            <div className="text-dark py-2 text-lg">
              {product.ratingsQuantity === 0 && "No Rating "}
            </div>
            <p className="text-dark">{product.description}</p>
            <form
              className="flex gap-4 py-6 items-center flex-col md:flex-row"
              onSubmit={(e) => addToCart(e)}
            >
              <div className=" flex">
                {product.colors && product.colors.length != 0 && (
                  <>
                    <span className="text-dark font-semibold">Colors:</span>
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]"
                      >
                        <input
                          className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-gold checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-gold checked:after:bg-gold checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-gold checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-gold dark:checked:after:border-gold dark:checked:after:bg-gold dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-gold dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="color"
                          required
                          id={color}
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                        />
                        <label
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                          htmlFor={color}
                        >
                          {color}
                        </label>
                      </div>
                    ))}
                  </>
                )}
              </div>
              {!incart && (
                <button className="btn bg-gold text-dark px-2 p-1">
                  {loading ? (
                    <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
                  ) : (
                    <>Add To Cart</>
                  )}
                </button>
              )}
            </form>
            {incart && (
              <button
                className="btn bg-red-500 text-white px-2 p-1"
                onClick={remove}
              >
                {loading ? (
                  <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
                ) : (
                  <>Remove From Cart</>
                )}
              </button>
            )}
          </div>
        </div>
        <Reviews product={product} />
      </div>
    </div>
  );
}

export default Product;
