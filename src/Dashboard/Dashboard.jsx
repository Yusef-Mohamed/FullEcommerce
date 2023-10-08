import React from "react";
import Header from "../Components/Header";

import { Outlet, useNavigate } from "react-router";
import Sidebar from "../Components/Sidebar";

function Dashboard() {
  let token = localStorage.getItem("token");
  let data = JSON.parse(localStorage.getItem("data"));

  let nav = useNavigate();
  if (!token && (data.role === "manager" || data.role === "admin")) {
    setTimeout(() => {
      nav("/login");
    }, 1000);
  }
  return (
    <div className="h-screen">
      <Header />
      <div className="w-full flex min-h-full ">
        <div className="md:w-48">
          <Sidebar />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
