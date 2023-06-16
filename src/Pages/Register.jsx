import { useState } from "react";
import Header from "../Components/Header";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router";
import FormInput from "../Components/FormInput";
import GoogleAuth from "../Components/GoogleAuth";

function Register() {
  const cookie = new Cookies();
  const [loading, setLoading] = useState(false);

  const [emailErr2, setEmailErr2] = useState("");
  const nav = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },

    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  let handleSubmit = async function (e) {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await axios
        .post(`https://node-api-v1.onrender.com/api/v1/auth/signup`, {
          name: values.username,
          email: values.email,
          password: values.password,
          passwordConfirm: values.confirmPassword,
        })
        .finally(() => setLoading(false));
      console.log(res);
      cookie.set("Bearer", res.data.token);
      cookie.set("data", res.data.data);
      nav("/");
    } catch (err) {
      console.log(err);
      setEmailErr2(err.response.data.errors[0].msg);
    }
  };
  return (
    <div className="h-screen flex  flex-col">
      <Header />
      <div className="flex-col w-full md:w-1/2 mx-auto flex-1 flex items-center justify-center">
        <div className="bg-white w-full">
          <GoogleAuth text={"Register With Google"} />

          <form onSubmit={handleSubmit} className="p-5  shadow-xl  w-full">
            <h2 className="text-dark font-semibold text-2xl mb-10">
              Create New Account
            </h2>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <span className="my-3 text-red-500">{emailErr2}</span>
            <button className="btn text-dark bg-gold w-full mt-5 p-3">
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
              ) : (
                <>Register</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
