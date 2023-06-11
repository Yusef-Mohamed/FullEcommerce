import { useEffect, useState } from "react";
import logo from "../../images/no-image-icon-0.jpg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
function NewUser() {
  const [errCode, setErrCode] = useState("");

  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);

  const [email, setEmail] = useState(null);
  const [email2, setEmail2] = useState(null);

  const [role, setRole] = useState("");

  const [phone, setPhone] = useState("");

  const [image, setImage] = useState(null);
  const [imageErr, setImageErr] = useState(false);

  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const cookie = new Cookies();
  const id = useParams().id;

  const token = cookie.get("Bearer");

  // Get User Old Data
  useEffect(() => {
    axios
      .get(`https://node-api-v1.onrender.com/api/v1/Users/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        {
          console.log(res.data.data);
          setName(res.data.data.name);
          setEmail(res.data.data.email);
          setEmail2(res.data.data.email);
          setRole(res.data.data.role);
          setPhone(res.data.data.phone);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  let createBrand = async function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("phone", phone);
    if (email !== email2) {
      formData.append("email", email);
    }
    if (image) {
      formData.append("profileImg", image);
    }
    console.log(formData);
    await axios
      .put(`https://node-api-v1.onrender.com/api/v1/Users/${id}`, formData, {
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
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <div className="p-8 min-h-full">
      <h2 className="font-semibold text-2xl ">Edit User</h2>
      <form action="" className="my-5" onSubmit={(e) => createBrand(e)}>
        {/* Name  */}
        <div>
          <label className="block my-4"> Name :</label>
          <input
            required
            pattern="^[A-Za-z0-9]{3,16}$"
            type="text"
            placeholder="Name"
            value={name}
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email  */}
        <div>
          <label className="block my-4"> Email :</label>
          <input
            required
            value={email}
            type="email"
            placeholder="Example@gmail.com"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Role*/}
        <div>
          <label className="block my-4"> Role </label>
          <select
            className=" block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => setRole(e.target.value)}
          >
            {role === "user" ? (
              <option value="user" selected>
                User
              </option>
            ) : (
              <option value="user">User</option>
            )}
            {role === "admin" ? (
              <option value="admin" selected>
                Admin
              </option>
            ) : (
              <option value="admin">Admin</option>
            )}
            {role === "manager" ? (
              <option value="manager" selected>
                Manager
              </option>
            ) : (
              <option value="manager">Manager</option>
            )}
          </select>
        </div>
        {/* Phone*/}
        <div>
          <label className="block my-4"> Phone:</label>
          <input
            pattern="^[0-9]{10,16}$"
            required
            type="text"
            placeholder="Phone"
            className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
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

        {errCode !== "" && <p className="text-red-500 my-2">{errCode}</p>}
        <button
          type="submit"
          className="btn text-gold bg-dark px-10 p-2 mx-auto"
        >
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
          ) : (
            <>Update </>
          )}
        </button>
      </form>
    </div>
  );
}

export default NewUser;
