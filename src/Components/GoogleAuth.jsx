import React from "react";
import logo from "../images/Google.jpeg";
import axios from "axios";
function GoogleAuth({ text }) {
  const handelAuth = function () {
    // axios
    //   .get(`https://node-api-v1.onrender.com/api/v1/auth/google`)
    //   .then((e) => console.log(e))
    //   .catch((err) => console.log(err));
  };
  return (
    <div>
      <div
        className="flex items-center justify-center w-fit mx-auto mt-6 bg-[#4587f7] text-white p-1 cursor-not-allowed"
        onClick={(e) => handelAuth(e)}
      >
        <img src={logo} className="w-8" alt="" />
        <span className="mx-2">{text}</span>
      </div>
      <div className="mt-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
          Or
        </p>
      </div>
    </div>
  );
}

export default GoogleAuth;
