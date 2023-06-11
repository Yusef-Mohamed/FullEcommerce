import { useState } from "react";
import logo from "../../images/no-image-icon-0.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import FormInput from "../../Components/FormInput";
function NewUser() {
  const [errCode, setErrCode] = useState("");
  const [role, setRole] = useState("user");
  const [image, setImage] = useState(null);
  const [imageErr, setImageErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      pattern: "^[A-Za-z0-9]{3,16}$",
      label: "Username",
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
      id: 3,
      name: "phone",
      type: "text",
      placeholder: "Phone",
      errorMessage: "phone must be more than 10 numbers",
      label: "Phone",
      required: true,
      pattern: "^[0-9]{10,16}$",
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

  let createBrand = async function (e) {
    e.preventDefault();
    if (image === null) {
      setImageErr(true);
    } else {
      setImageErr(false);
    }

    if (role && image) {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("passwordConfirm", values.confirmPassword);
      formData.append("phone", values.phone);
      formData.append("role", role);
      formData.append("profileImg", image);
      console.log(formData);
      await axios
        .post(`https://node-api-v1.onrender.com/api/v1/users`, formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res);

          nav("/dashboard/users");
        })
        .catch((err) => {
          console.log(err);
          setErrCode(err.response.data.errors[0].msg);
        });
    }
    setLoading(false);
  };

  return (
    <div className="p-8 min-h-full">
      <h2 className="font-semibold text-2xl ">Create User</h2>
      <form action="" className="my-5" onSubmit={(e) => createBrand(e)}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        {/* Role*/}
        <div>
          <label className="block my-4"> Role </label>
          <select
            className=" block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        {/* Image  */}
        <div>
          <label className="block my-4">Image :</label>
          <div className=" flex gap-10 items-center">
            <input
              type="file"
              placeholder="Brand name"
              className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
              onChange={(e) => setImage(e.target.files.item(0))}
            />
            <div className="w-32 h-32 bg-gray-600">
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  className="w-32 h-32 block object-contain"
                  alt=""
                />
              )}
              {!image && (
                <img
                  src={logo}
                  className="w-32 h-32 block object-contain"
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        {imageErr && (
          <p className="text-red-500 my-2">You Must Enter the image</p>
        )}
        {errCode !== "" && <p className="text-red-500 my-2">{errCode}</p>}
        <button
          type="submit"
          className="btn text-gold bg-dark px-10 p-2 mx-auto"
        >
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
          ) : (
            <>Create</>
          )}
        </button>
      </form>
    </div>
  );
}

export default NewUser;
