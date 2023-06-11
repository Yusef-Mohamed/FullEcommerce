import { useState } from "react";
import Header from "../../Components/Header";
import axios from "axios";
import { useNavigate } from "react-router";
import FormInput from "../../Components/FormInput";

function ResetPassword() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },

    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();
  let handel = async function (e) {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`https://node-api-v1.onrender.com/api/v1/auth/resetPassword`, {
        email: values.email,
        newPassword: values.password,
      })
      .then((res) => {
        console.log(res);
        nav("/login");
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="h-screen flex  flex-col">
      <Header />
      <div className="w-full md:w-1/2 mx-auto flex-1 flex items-center">
        <form className="p-5  shadow-xl bg-dimWhite w-full" onSubmit={handel}>
          <h2 className="text-dark font-semibold text-2xl mb-10">
            Reset Password
          </h2>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <span className="my-3 text-red-500">{err}</span>

          <button className="btn text-dark bg-gold w-full mt-5 p-3">
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
            ) : (
              <>Reset</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
