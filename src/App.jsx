import { Route, Routes } from "react-router";
import Login from "./Pages/Login";
import Dashboard from "./Dashboard/Dashboard";
import Main from "./Dashboard/Main";
import Users from "./Dashboard/Users/Users";
import EditBrand from "./Dashboard/Brands/EditBrand";
import NewBrand from "./Dashboard/Brands/NewBrand";
import Brand from "./Dashboard/Brands/Brand";
import NewUser from "./Dashboard/Users/NewUser";
import EditUser from "./Dashboard/Users/EditUser";
import Categories from "./Dashboard/Categories/Categories";
import NewCate from "./Dashboard/Categories/NewCate";
import EditCate from "./Dashboard/Categories/EditCate";
import SubCate from "./Dashboard/Categories/SubCate";
import NewSub from "./Dashboard/Categories/NewSub";
import EditSub from "./Dashboard/Categories/EditSub";
import Products from "./Dashboard/Products/Products";
import NewProduct from "./Dashboard/Products/NewProduct";
import Coupons from "./Dashboard/Coupons/Coupons";
import NewCoupon from "./Dashboard/Coupons/NewCoupon";
import EditCoupon from "./Dashboard/Coupons/EditCoupon";
import EditProduct from "./Dashboard/Products/EditProduct";
import React from "react";
import { ToastContainer } from "react-toastify";
export const apiRoute = "https://api.thefirstbrand.shop";
export default function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="main" element={<Main />} />
          <Route path="products" element={<Products />} />
          <Route path="products/newproduct" element={<NewProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />

          <Route path="categories" element={<Categories />} />
          <Route path="categories/newcategorie" element={<NewCate />} />
          <Route path="categories/edit/:cateId" element={<EditCate />} />
          <Route path="categories/:cateid/subcate" element={<SubCate />} />
          <Route
            path="categories/:cateid/subcate/edit/:subId"
            element={<EditSub />}
          />
          <Route
            path="categories/:cateid/subcate/newsubcate"
            element={<NewSub />}
          />

          <Route path="brands" element={<Brand />} />
          <Route path="brands/newbrand" element={<NewBrand />} />
          <Route path="brands/edit/:id" element={<EditBrand />} />

          <Route path="users" element={<Users />} />
          <Route path="users/newuser" element={<NewUser />} />
          <Route path="users/edit/:id" element={<EditUser />} />

          <Route path="coupon" element={<Coupons />} />
          <Route path="coupon/newcoupon" element={<NewCoupon />} />
          <Route path="coupon/edit/:id" element={<EditCoupon />} />
        </Route>
      </Routes>
    </div>
  );
}
