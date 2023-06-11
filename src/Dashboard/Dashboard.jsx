import React from "react";
import Header from "../Components/Header";

import Cookies from "universal-cookie";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "../Components/Sidebar";
function Dashboard() {
  const cookie = new Cookies();
  let token = cookie.get("Bearer");
  let data = cookie.get("data");

  let nav = useNavigate();

  if (!token && (data.role === "manager" || data.role === "admin")) {
    nav("/login");
  }
  return (
    <div className="h-screen">
      <Header />
      <div className="w-full flex min-h-full ">
        <div className="md:w-48">
          <Sidebar />
        </div>
        <div className="w-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
