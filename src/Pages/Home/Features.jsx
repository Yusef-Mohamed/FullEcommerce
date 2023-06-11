import React from "react";

function Features() {
  return (
    <div className="mx-auto container">
      <div className="grid  md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 flex items-center  py-8">
          <i className="fa-solid fa-check text-gold text-4xl mr-5"></i>
          <span className="text-dark text-xl font-semibold">
            Quality Product
          </span>
        </div>
        <div className="bg-white p-6  flex items-center  py-8">
          <i className="fa-solid fa-truck-fast text-gold text-4xl mr-5"></i>
          <span className="text-dark text-xl font-semibold">Free Shipping</span>
        </div>
        <div className="bg-white p-6 flex items-center py-8">
          <i className="fa-solid fa-right-left text-gold text-4xl mr-5"></i>
          <span className="text-dark text-xl font-semibold">14-Day Return</span>
        </div>
        <div className="bg-white p-6 flex items-center  py-8">
          <i className="fa-solid fa-phone-volume text-gold text-4xl mr-5"></i>
          <span className="text-dark text-xl font-semibold">24/7 Support</span>
        </div>
      </div>
    </div>
  );
}

export default Features;
