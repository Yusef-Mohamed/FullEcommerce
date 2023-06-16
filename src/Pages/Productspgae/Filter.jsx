import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./filter.css";
import Rangee from "./Rangee";
function Filter({ agian, setAgian }) {
  // Range
  const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-input input"),
    range = document.querySelector(".slider .progress");
  let priceGap = 100;

  priceInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);

      if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
        if (e.target.className === "input-min") {
          rangeInput[0].value = minPrice;
          range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
        } else {
          rangeInput[1].value = maxPrice;
          range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
        }
      }
    });
  });

  rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

      if (maxVal - minVal < priceGap) {
        if (e.target.className === "range-min") {
          rangeInput[0].value = maxVal - priceGap;
        } else {
          rangeInput[1].value = minVal + priceGap;
        }
      } else {
        priceInput[0].value = minVal;
        priceInput[1].value = maxVal;
        range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
        range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    });
  });

  const navigate = useNavigate();
  const [data, setData] = useState({
    categories: [],
    subCates: [],
    brands: [],
  });
  const queryParams = new URLSearchParams(window.location.search);
  const [chosen, setChosen] = useState({
    category: queryParams.get("category"),
    subcategories: queryParams.get("subcategories"),
    brand: queryParams.get("brand"),
    sort: queryParams.get("sort"),
    // priceLte: queryParams.get("price[lte]"),
    // priceGte: queryParams.get("price[gte]"),
    keyword: queryParams.get("keyword"),
  });
  //   get filter data
  //   Cate
  useEffect(() => {
    axios
      .get(`https://node-api-v1.onrender.com/api/v1/categories`)
      .then((res) => {
        setData((prevData) => ({ ...prevData, categories: res.data.data }));
      })
      .catch((err) => console.log(err));
  }, []);

  // Sub Cate
  useEffect(() => {
    if (chosen.category) {
      axios
        .get(
          `https://node-api-v1.onrender.com/api/v1/categories/${chosen.category}/subCategories`
        )
        .then((res) => {
          setData((prevData) => ({ ...prevData, subCates: res.data.data }));
        })
        .catch((err) => console.log(err));
    }
  }, [chosen.category]);
  //   Brand
  useEffect(() => {
    axios
      .get(`https://node-api-v1.onrender.com/api/v1/brands`)
      .then((res) => {
        setData((prevData) => ({ ...prevData, brands: res.data.data }));
      })
      .catch((err) => console.log(err));
  }, []);

  // Show Data
  const showData = function (arr, chosen) {
    return arr.map((e) => {
      if (chosen === e._id) {
        return (
          <option key={e._id} selected value={e._id}>
            {e.name}
          </option>
        );
      } else {
        return (
          <option key={e._id} value={e._id}>
            {e.name}
          </option>
        );
      }
    });
  };
  // Show Stars
  const starts = function (int) {
    return (
      <>
        {[...Array(int)].map((_, index) => (
          <i
            key={index}
            className="fa-solid fa-star text-gold text-2xl my-1"
          ></i>
        ))}
        {[...Array(5 - int)].map((_, index) => (
          <i
            key={index}
            className="fa-solid fa-star text-dark text-2xl my-1"
          ></i>
        ))}
      </>
    );
  };
  //   handel stars rating
  const ratingFilter = function (num) {
    const items = document.querySelectorAll(".h-filter li");
    items.forEach((e) => e.classList.remove("on"));
    items[num].classList.add("on");
  };
  //   Handel Data Change
  const hadelChange = function (event, name) {
    addQueryParams(name, event.target.value);
    setChosen({ ...chosen, [name]: event.target.value });
  };
  const addQueryParams = function (name, value) {
    if (name == "category") {
      queryParams.delete("subcategories");
    }

    if (name == "priceLte") {
      name = "price[lte]";
    } else if (name == "priceGte") {
      name = "price[gte]";
    }
    if (value) {
      if (name == "subcategories") {
        queryParams.set(name, [value.toString()]);
      } else {
        queryParams.set(name, value);
      }
    } else {
      queryParams.delete(name);
    }

    navigate(`?${queryParams.toString()}`);
    setAgian(agian + 1);
  };

  return (
    <div className=" col-span-12 md:col-span-4 pb-8 p-4 bg-white rounded-lg">
      <Link
        className="bg-red-500 text-white px-2 py-2 block w-1/2 mx-auto mb-4 text-center rounded-lg"
        onClick={(e) => {
          navigate("/products");
          setChosen({
            category: "",
            subcategories: "",
            brand: "",
            sort: "",
            // priceLte: queryParams.get("price[lte]"),
            // priceGte: queryParams.get("price[gte]"),
            keyword: "",
          });
          ratingFilter(5);
          setAgian(agian + 1);
        }}
      >
        Clear All Filters
      </Link>
      <div className=" items-center">
        <span className="mx-3">Search :</span>
        <input
          type="text"
          placeholder="Search"
          className="border py-2 px-3 rounded-2xl "
          value={chosen.keyword}
          onChange={(e) => {
            hadelChange(e, "keyword");
          }}
        />
      </div>
      <div>
        <div className="p-2 ">
          <span className="mx-2">Categories :</span>
          <select
            className="border focus:outline-none p-2 rounded-lg"
            onChange={(e) => {
              hadelChange(e, "category");
            }}
          >
            <option value="">All Categories</option>
            {showData(data.categories, chosen.category)}
          </select>
        </div>
        {data.subCates.length !== 0 && (
          <div className="p-2 ">
            <span className="mx-2">SubCategories :</span>

            <select
              className="border focus:outline-none p-2 rounded-lg"
              onChange={(e) => hadelChange(e, "subcategories")}
            >
              <option value="">All Categories</option>
              {showData(data.subCates, chosen.subcategories)}
            </select>
          </div>
        )}

        <div className="p-2">
          <span className="mx-2">Brands :</span>

          <select
            className="border focus:outline-none p-2 rounded-lg"
            onChange={(e) => hadelChange(e, "brand")}
          >
            <option value="">All Brands</option>
            {showData(data.brands, chosen.brand)}
          </select>
        </div>
      </div>
      <div>
        <div className="p-2">
          <span className="mx-2">Sort :</span>
          <select
            className="border focus:outline-none p-2 rounded-lg"
            onChange={(e) => hadelChange(e, "sort")}
          >
            <option value="">No Sort</option>
            {chosen.sort === "-price" ? (
              <option value="-price" selected>
                High to Low
              </option>
            ) : (
              <option value="-price">High to Low</option>
            )}
            {chosen.sort === "price" ? (
              <option value="price" selected>
                Low to High
              </option>
            ) : (
              <option value="price">Low to High</option>
            )}
          </select>
        </div>
        {/* <div className="p-2 flex items-center">
          <span className="mx-2">Max Price :</span>
          <input
            type="number"
            onChange={(e) => hadelChange(e, "priceLte")}
            className="border p-1"
            placeholder="Max Price"
            value={chosen.priceLte}
          />
        </div>
        <div className="p-2 flex items-center">
          <span className="mx-2">Min Price :</span>
          <input
            type="number"
            onChange={(e) => hadelChange(e, "priceGte")}
            className="border p-1"
            placeholder="Min Price"
          />
        </div> */}
        <Rangee agian={agian} setAgian={setAgian} />
      </div>
      <div>
        <div className="p-2 mx-2">
          <ul className="h-filter">
            <li
              onClick={() => {
                addQueryParams("ratingsAverage[gte]", 5);
                ratingFilter(0);
              }}
              className="cursor-pointer p-2"
            >
              {starts(5)}
            </li>
            <li
              onClick={() => {
                addQueryParams("ratingsAverage[gte]", 4);
                ratingFilter(1);
              }}
              className="cursor-pointer p-2"
            >
              {starts(4)}
            </li>
            <li
              className="cursor-pointer p-2"
              onClick={() => {
                addQueryParams("ratingsAverage[gte]", 3);
                ratingFilter(2);
              }}
            >
              {starts(3)}
            </li>
            <li
              onClick={() => {
                addQueryParams("ratingsAverage[gte]", 2);
                ratingFilter(3);
              }}
              className="cursor-pointer p-2"
            >
              {starts(2)}
            </li>
            <li
              onClick={() => {
                addQueryParams("ratingsAverage[gte]", 1);
                ratingFilter(4);
              }}
              className="cursor-pointer p-2"
            >
              {starts(1)}
            </li>
            <li
              onClick={() => {
                addQueryParams("ratingsAverage[gte]", "");
                ratingFilter(5);
              }}
              className="text-dark cursor-pointer p-2"
            >
              <span className="font-semibold">No Rating Filter</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Filter;
