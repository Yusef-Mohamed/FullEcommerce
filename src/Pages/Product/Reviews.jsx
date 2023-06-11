import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function Reviews({ product }) {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(1);
  const [text, setText] = useState("");
  const [ref, setRef] = useState(0);
  const [myRewId, setMyRevId] = useState(0);
  const [edit, setEdit] = useState(false);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const [data, setData] = useState(0);
  useEffect(() => {
    setData(cookie.get("data")._id);
  }, []);
  const handleRatingClick = (value) => {
    setRating(value);
  };
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <i
        key={index}
        onClick={() => handleRatingClick(index + 1)}
        className={`fa-solid fa-star ${
          index + 1 <= rating ? "text-gold" : "text-dark"
        }`}
        style={{ cursor: "pointer" }}
      ></i>
    ));
  };

  let handel = async function () {
    setLoading(true);
    if (edit) {
      await axios
        .put(
          `https://node-api-v1.onrender.com/api/v1/reviews/${myRewId}`,
          {
            title: text,
            ratings: rating,
            product: product._id,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      await axios
        .post(
          `https://node-api-v1.onrender.com/api/v1/reviews`,
          {
            title: text,
            ratings: rating,
            product: product._id,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    setLoading(false);
  };
  const deletee = function (id) {
    axios
      .delete(`https://node-api-v1.onrender.com/api/v1/reviews/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => setRef((prev) => prev + 1))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2 className="heading mb-8 w-1/2 ">
        <span className="text-2xl">Reviews</span>
      </h2>
      <div className="lg:flex bg-white">
        <div className="lg:w-1/2 mb-4 p-8 lg:border-r ">
          <h2 className="line-clamp-2 text-xl  mb-4 border-b border-b-dark">
            {product.reviews &&
              `${product.reviews.length} review for "${product.title}"`}
          </h2>
          <div className="overflow-y-auto max-h-[500px]">
            {product.reviews && product.reviews.length === 0 && (
              <div className="text-dark text-center my-16">
                There is no reviews
              </div>
            )}
            {product.reviews &&
              product.reviews.length !== 0 &&
              product.reviews.map((e) => (
                <div key={e._id} className="text-dark p-4 border">
                  <div className="flex justify-between">
                    <h2 className="mb-4">
                      Review from {e.user.name} {e.user._id == data && "(You)"}
                    </h2>
                    {e.user._id == data && (
                      <div>
                        <button
                          className="text-white px-2 p-1 bg-green-500 btn mx-2"
                          onClick={(ele) => {
                            setEdit(true);
                            setText(e.title);
                            setRating(e.ratings);
                            setMyRevId(e._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-white px-2 p-1 bg-red-500 btn"
                          onClick={(event) => deletee(e._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    {[...Array(e.ratings)].map((_, index) => (
                      <i key={index} className="fa-solid fa-star text-gold"></i>
                    ))}
                    {[...Array(5 - e.ratings)].map((_, index) => (
                      <i key={index} className="fa-solid fa-star text-dark"></i>
                    ))}
                  </div>
                  <p className="my-4">{e.title}</p>
                  <div className="text-right p-2">
                    {e.updatedAt.split("T")[0]}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="border-t-2 border-t-dark lg:border-none lg:w-1/2 p-8">
          <h2 className="text-xl pb-2 mb-2 border-b border-b-dark w-fit">
            {edit == true ? "Edit" : "Add"} Your review
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handel();
            }}
          >
            <div className="flex items-center py-6">
              <span className="text-dark font-semibold mr-2">Rating:</span>
              <div className="text-2xl">{renderStars()}</div>
              <span className="mx-4 ">{rating}</span>
            </div>
            <textarea
              onChange={(e) => setText(e.target.value)}
              required
              value={text}
              rows="10"
              minLength={16}
              placeholder="Leaver your review"
              className="border-dark border w-full p-5 focus:outline-none"
            ></textarea>
            <div className="flex justify-center pt-4">
              <button className="btn text-dark bg-gold  py-2 w-1/2 mx-auto">
                {loading ? (
                  <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
                ) : (
                  <> {edit == true ? "Edit" : "Add"}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
