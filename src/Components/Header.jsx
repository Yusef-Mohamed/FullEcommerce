import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import React from "react";
function Header() {
  let data = JSON.parse(localStorage.getItem("data"));
  let token = localStorage.getItem("token");
  let [ref, setRef] = useState(0);
  let nav = useNavigate();
  let logout = function () {
    localStorage.clear;
    setRef((perv) => perv + 1);
    nav("/");
  };
  return (
    <div className="py-3 bg-white ">
      <div className="container mx-auto flex justify-center px-8 items-center">
        <div className="Acc dropdown-con flex gap-4">
          <div className="font-semibold hover:bg-slate-200 p-1 transition rounded-lg relative drophov">
            <i className="fa-solid fa-user mx-2"></i>
            My Account
            <i className="mx-2 fa-sharp fa-solid fa-arrow-down"></i>
            {/* dropdown */}
            <div className="dropdown absolute py-3 w-full border rounded-lg bg-white hidden transition ">
              {!token && (
                <div className="flex gap-1 flex-col">
                  <Link className="p-1 hover:bg-slate-100 transition" to="/">
                    <i className="fa-regular fa-pen-to-square mx-2"></i> Login
                  </Link>
                </div>
              )}
              {token && (
                <div className="flex gap-1 flex-col">
                  <button
                    className="p-1 hover:bg-slate-100 transition text-left"
                    onClick={logout}
                  >
                    <i className="fa-solid fa-right-from-bracket mx-2"></i>
                    Logout
                  </button>
                  {(data.role === "manager" || data.role === "admin") && (
                    <Link
                      className="p-1 hover:bg-slate-100 transition"
                      to="/dashboard"
                    >
                      <i className="fa-solid fa-toolbox mx-2"></i>
                      Dashboard
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
