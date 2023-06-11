import { useState } from "react";
import Header from "../../Components/Header";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router";
import logo from "../../images/no-image-icon-0.jpg";
import FormInput from "../../Components/FormInput";

function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  console.log(image);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const [emailErr2, setEmailErr2] = useState("");
  const nav = useNavigate();
  const [values, setValues] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "currentPassword",
      type: "password",
      placeholder: "Current Password",
      label: "Current Password",
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
    {
      id: 3,
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
    const formData = new FormData();
    formData.append("name", values.username);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("profileImg", image);

    try {
      setLoading(true);
      let res = await axios
        .put(
          `https://node-api-v1.onrender.com/api/v1/users/changeMyPassword`,
          {
            currentPassword: values.currentPassword,
            password: values.password,
            passwordConfirm: values.confirmPassword,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .finally(() => setLoading(false));
      cookie.remove("data");
      cookie.remove("Bearer");
      nav("/login");
    } catch (err) {
      console.log(err);
      setEmailErr2(err.response.data.errors[0].msg);
    }
  };
  return (
    <div className="h-screen flex  flex-col">
      <Header />
      <div className="w-full md:w-1/2 mx-auto flex-1 flex items-center">
        <form
          onSubmit={handleSubmit}
          className="p-5  shadow-xl bg-dimWhite w-full"
        >
          <h2 className="text-dark font-semibold text-2xl mb-10">
            Change Your Password
          </h2>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button className="btn text-dark bg-gold w-full mt-5 p-3">
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
            ) : (
              <>Change</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
