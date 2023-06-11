import { useState } from "react";
import Header from "../../Components/Header";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router";
import logo from "../../images/no-image-icon-0.jpg";
import FormInput from "../../Components/FormInput";

function UpdateData() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  console.log(image);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const [emailErr2, setEmailErr2] = useState("");
  const nav = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
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
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
    },
    {
      id: 3,
      name: "phone",
      type: "text",
      placeholder: "Phone",
      errorMessage: "phone must be more than 10 numbers",
      label: "Phone",
      pattern: "^[0-9]{10,16}$",
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  let handleSubmit = async function (e) {
    e.preventDefault();
    const formData = new FormData();
    if (values.username) {
      formData.append("name", values.username);
    }
    if (values.email) {
      formData.append("email", values.email);
    }
    if (values.phone) {
      formData.append("phone", values.phone);
    }
    if (values.image) {
      formData.append("profileImg", image);
    }

    try {
      setLoading(true);
      let res = await axios
        .put(
          `https://node-api-v1.onrender.com/api/v1/users/changeMyData`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .finally(() => setLoading(false));
      nav("/profile");
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
          <h2 className="text-dark font-semibold text-2xl ">
            Update Your Account Data
          </h2>
          <h2 className="text-dark font-semibold text-sm mb-10">
            "you can enter one input"
          </h2>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <div>
            <label className="block my-4">Brand Image :</label>
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
          <span className="my-3 text-red-500">{emailErr2}</span>
          <button className="btn text-dark bg-gold w-full mt-5 p-3">
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
            ) : (
              <>Update</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateData;
