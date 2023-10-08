import { NavLink } from "react-router-dom";
import React from "react";
function Sidebar() {
  return (
    <div className="bg-dark h-full whitespace-nowrap">
      <NavLink
        activeclassname="active"
        className="text-white font-semibold text-lg p-4 block nav-link"
        to="main"
      >
        <i className="md:mr-3 fa-solid fa-toolbox"></i>

        <span className="hidden md:inline"> Orders</span>
      </NavLink>
      <NavLink
        activeclassname="active"
        className="text-white font-semibold text-lg p-4 block nav-link"
        to="users"
      >
        <i className="md:mr-3 fa-solid fa-users"></i>
        <span className="hidden md:inline"> Users</span>
      </NavLink>
      <NavLink
        activeclassname="active"
        className="text-white font-semibold text-lg p-4 block nav-link"
        to="products"
      >
        <i className="md:mr-3 fa-brands fa-product-hunt"></i>
        <span className="hidden md:inline">Products</span>
      </NavLink>
      <NavLink
        activeclassname="active"
        className="text-white font-semibold text-lg p-4 block nav-link"
        to="categories"
      >
        <i className="md:mr-3 fa-solid fa-bars"></i>
        <span className="hidden md:inline">Categories</span>
      </NavLink>
      <NavLink
        activeclassname="active"
        className="text-white font-semibold text-lg p-4 block nav-link"
        to="brands"
      >
        <i className="md:mr-3 fa-solid fa-bars"></i>
        <span className="hidden md:inline">Brands</span>
      </NavLink>
      <NavLink
        activeclassname="active"
        className="text-white font-semibold text-lg p-4 block nav-link"
        to="coupon"
      >
        <i className="md:mr-3  fa-solid fa-percent"></i>
        <span className="hidden md:inline">Coupon</span>
      </NavLink>
    </div>
  );
}

export default Sidebar;
