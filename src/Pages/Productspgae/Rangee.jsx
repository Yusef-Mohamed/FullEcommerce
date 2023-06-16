import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Rangee = ({ agian, setAgian }) => {
  const queryParams = new URLSearchParams(window.location.search);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const priceGap = 100;

  const handleRangeChange = (e) => {
    const inputName = e.target.name;
    const inputValue = parseInt(e.target.value);

    if (inputName === "minRange") {
      if (maxPrice - inputValue >= priceGap) {
        setMinPrice(inputValue);
      } else {
        setMinPrice(maxPrice - priceGap);
      }
    } else if (inputName === "maxRange") {
      if (inputValue - minPrice >= priceGap) {
        setMaxPrice(inputValue);
      } else {
        setMaxPrice(minPrice + priceGap);
      }
    }
  };

  const calculateLeftPosition = () => {
    return (minPrice / 10000) * 100 + "%";
  };

  const calculateRightPosition = () => {
    return 100 - (maxPrice / 10000) * 100 + "%";
  };
  const navigate = useNavigate();

  const handelSubmit = () => {
    console.log(0);
    queryParams.set("price[gte]", minPrice);
    queryParams.set("price[lte]", maxPrice);
    navigate(`?${queryParams.toString()}`);
    setAgian(agian + 1);
  };
  return (
    <div className="wrapper mx-2">
      <header>
        <h2>Price Range</h2>
        <p>Use slider or enter min and max price</p>
      </header>
      <div className="price-input">
        <div className="field">
          <span>Min :</span>
          <input
            type="number"
            className="input-min border"
            name="minPrice"
            value={minPrice}
            onChange={(e) => handlePriceChange(e)}
            disabled
          />
        </div>
        <div className="field">
          <span>Max :</span>
          <input
            type="number"
            className="input-max border"
            name="maxPrice"
            value={maxPrice}
            max={10000}
            disabled
            onChange={(e) => handlePriceChange(e)}
          />
        </div>
        <button
          className="p-2 bg-gold text-dark px-4 rounded-lg mt-2"
          onClick={handelSubmit}
        >
          Go
        </button>
      </div>
      <div className="slider ">
        <div
          className="progress"
          style={{
            left: calculateLeftPosition(),
            right: calculateRightPosition(),
          }}
        ></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="range-min"
          name="minRange"
          min="0"
          max="10000"
          value={minPrice}
          step="100"
          onChange={handleRangeChange}
          onBlur={handelSubmit}
        />
        <input
          type="range"
          className="range-max"
          name="maxRange"
          min="0"
          max="10000"
          value={maxPrice}
          step="100"
          onChange={handleRangeChange}
          onBlur={handelSubmit}
        />
      </div>
    </div>
  );
};

export default Rangee;
