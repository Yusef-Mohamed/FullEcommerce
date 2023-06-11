import { Route, Routes } from "react-router";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
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
import Profile from "./Pages/Profile/Profile";
import UpdateData from "./Pages/Profile/UpdateData";
import ChangePassword from "./Pages/Profile/ChangePassword";
import Coupons from "./Dashboard/Coupons/Coupons";
import NewCoupon from "./Dashboard/Coupons/NewCoupon";
import EditCoupon from "./Dashboard/Coupons/EditCoupon";
import Home from "./Pages/Home/Home";
import EditProduct from "./Dashboard/Products/EditProduct";
import Product from "./Pages/Product/Product";
import ProductsPage from "./Pages/Productspgae/ProductsPage";
import ForgotPassword from "./Pages/ForgetPassword/ForgotPassword";
import ResetPassword from "./Pages/ForgetPassword/ResetPassword";
import VerifyResetCode from "./Pages/ForgetPassword/VerifyResetCode";
import Shopingcart from "./Pages/Shopingcart";
import { ToastContainer } from "react-toastify";
import ShopPages from "./Pages/ShopPages";
import CheckOut from "./Pages/Checkout/CheckOut";
export default function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Pages  */}
        <Route path="" element={<ShopPages />}>
          <Route path="" element={<Home />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="shopingcart" element={<Shopingcart />} />
          <Route path="checkout" element={<CheckOut />} />
        </Route>

        {/* profile  */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/updatedata" element={<UpdateData />} />
        <Route path="/profile/changepassword" element={<ChangePassword />} />
        {/* Auth  */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verifyResetCode" element={<VerifyResetCode />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        {/* DashBoard */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="main" element={<Main />} />
          {/* Products  */}
          <Route path="products" element={<Products />} />
          <Route path="products/newproduct" element={<NewProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          {/* <Route path="products" element={<Products />} /> */}
          {/* Categories  */}

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

          {/* Brand  */}
          <Route path="brands" element={<Brand />} />
          <Route path="brands/newbrand" element={<NewBrand />} />
          <Route path="brands/edit/:id" element={<EditBrand />} />
          {/* Users  */}

          <Route path="users" element={<Users />} />
          <Route path="users/newuser" element={<NewUser />} />
          <Route path="users/edit/:id" element={<EditUser />} />
          {/* coupon  */}

          <Route path="coupon" element={<Coupons />} />
          <Route path="coupon/newcoupon" element={<NewCoupon />} />
          <Route path="coupon/edit/:id" element={<EditCoupon />} />
        </Route>
      </Routes>
    </div>
  );
}
