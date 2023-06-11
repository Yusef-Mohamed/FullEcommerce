import React from "react";
import Banner from "./Banner";
import Categories from "./Categories";
import Features from "./Features";
import Products from "./Products";
export default function Home() {
  return (
    <div>
      <Banner />
      <Features />
      <Categories />
      <Products />
    </div>
  );
}
