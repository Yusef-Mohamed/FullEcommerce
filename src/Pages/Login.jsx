import { useState } from "react";
import Header from "../Components/Header";
import Cookies from "universal-cookie";

import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import GoogleAuth from "../Components/GoogleAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const cookie = new Cookies();
  const nav = useNavigate();

  let handel = async function (e) {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await axios
        .post(`https://node-api-v1.onrender.com/api/v1/auth/login`, {
          email: email,
          password: password,
        })
        .finally(() => {
          setLoading(false);
        });
      console.log(res);
      cookie.set("Bearer", res.data.token);
      cookie.set("data", res.data.data);
      nav("/");
    } catch (err) {
      console.log(err);
      setErr(err.response.data.message);
    }
  };
  return (
    <div className="h-screen flex  flex-col">
      <Header />
      <div className="flex-col w-full md:w-1/2 mx-auto flex-1 flex items-center justify-center">
        <div className="bg-white w-full">
          <GoogleAuth text={"Login With Google"} />

          <form className="p-5  shadow-xl bg-dimWhite w-full" onSubmit={handel}>
            <h2 className="text-dark font-semibold text-2xl mb-10">Login</h2>
            <div>
              <label className="block text-lg mb-3">Email :</label>
              <input
                type="email"
                min={4}
                className="bg-white border px-4 py-2 rounded-2xl w-full"
                placeholder="Example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mt-5">
              <label className="block text-lg mb-3">Password :</label>
              <input
                required
                min={4}
                type="password"
                className="bg-white border px-4 py-2 rounded-2xl w-full"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <span className="my-3 text-red-500">{err}</span>
            <Link
              to="/forgotPassword"
              className=" hover:text-red-500 transition py-3 block "
            >
              Forgot Password
            </Link>

            <button className="btn text-dark bg-gold w-full mt-5 p-3">
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
              ) : (
                <>Login</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
