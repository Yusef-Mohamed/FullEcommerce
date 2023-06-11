import { useState } from "react";
import Header from "../../Components/Header";
import axios from "axios";
import { useNavigate } from "react-router";

function VerifyResetCode() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();
  let handel = async function (e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`https://node-api-v1.onrender.com/api/v1/auth/verifyResetCode`, {
        resetCode: code.trim(),
      })
      .then((res) => {
        console.log(res);
        nav("/resetPassword");
      })
      .catch((err) => setErr(err.response.data.message))
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="w-full md:w-1/2 mx-auto flex-1 flex items-center">
        <form className="p-5  shadow-xl bg-dimWhite w-full" onSubmit={handel}>
          <h2 className="text-dark font-semibold text-2xl mb-10">
            Verify Reset Code
          </h2>
          <div>
            <label className="block text-lg mb-3">Code :</label>
            <input
              type="text"
              min={6}
              className="bg-white border px-4 py-2 rounded-2xl w-full"
              placeholder="666666"
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          <span className="my-3 text-red-500">{err}</span>

          <button className="btn text-dark bg-gold w-full mt-5 p-3">
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
            ) : (
              <>Submit</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyResetCode;
