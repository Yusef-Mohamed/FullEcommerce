import React from "react";

function Logo({ style }) {
  return (
    <div className="flex">
      <div
        className={` text-4xl font-bold p-2  ${
          style ? "text-dark bg-white" : "text-gold px-4 bg-dark"
        }`}
      >
        MULTI
      </div>
      <div
        className={` text-4xl font-bold p-2  ${
          style ? "text-white bg-gold" : "text-dark px-4 bg-gold"
        }`}
      >
        SHOP
      </div>
    </div>
  );
}

export default Logo;
