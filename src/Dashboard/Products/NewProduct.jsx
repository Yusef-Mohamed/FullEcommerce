import { useEffect, useState } from "react";
import logo from "../../images/no-image-icon-0.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import FormInput from "../../Components/FormInput";
function NewProduct() {
  const [errCode, setErrCode] = useState("");
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);

  const [cate, setCate] = useState([]);
  const [chosenCate, setChosenCate] = useState("");

  const [subCate, setSubCate] = useState([]);
  const [chosenSubCate, setChosenSubCate] = useState("");

  const [brand, setBrand] = useState([]);
  const [chosenBrand, setChosenBrand] = useState("");

  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  // get cate
  useEffect(() => {
    axios
      .get("https://node-api-v1.onrender.com/api/v1/categories")
      .then((res) => {
        setCate(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://node-api-v1.onrender.com/api/v1/categories/${chosenCate}/subCategories`
      )
      .then((res) => {
        setSubCate(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [chosenCate]);
  useEffect(() => {
    axios
      .get("https://node-api-v1.onrender.com/api/v1/brands")
      .then((res) => {
        setBrand(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [values, setValues] = useState({
    productname: "",
    description: "",
    quantity: "",
    sold: "",
    price: "",
    priceAfterDiscount: "",
    colors: "",
  });

  const inputs = [
    {
      id: 1,
      name: "productname",
      type: "text",
      placeholder: "product name",
      errorMessage: "Product Name should be more than 3 characters",
      pattern: "{3,}$",
      label: "Product Name :",
      required: true,
    },

    {
      id: 2,
      name: "description",
      type: "text",
      placeholder: "Description",
      errorMessage: "Description should be more than 16 characters",
      pattern: "{16,}$",
      label: "Description :",
      required: true,
    },
    {
      id: 3,
      name: "quantity",
      type: "number",
      placeholder: "Quantity",
      errorMessage: "Quantity must be more than 5",
      label: "Quantity :",
      min: 5,
      required: true,
    },
    {
      id: 4,
      name: "sold",
      type: "number",
      placeholder: "Sold",
      errorMessage: "Sold must be more than 1",
      label: "Sold :",
      min: 1,
      required: true,
    },
    {
      id: 5,
      name: "price",
      type: "number",
      placeholder: "Price",
      errorMessage: "Price must be more than 10",
      label: "Price :",
      min: 10,
      required: true,
    },
    {
      id: 6,
      name: "priceAfterDiscount",
      type: "number",
      placeholder: "Price After Discount",
      errorMessage: "Price After Discount must be less than Price",
      label: "Price After Discount :",
      max: values.price - 1,
    },
    {
      id: 7,
      name: "colors",
      type: "type",
      placeholder: "color1 / color2",
      label: "Colors: ",
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  let createBrand = async function (e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("title", values.productname);
    formData.append("description", values.description);
    formData.append("quantity", values.quantity);
    formData.append("sold", values.sold);
    formData.append("price", values.price);
    formData.append("imageCover", image);
    formData.append("category", chosenCate);
    formData.append("subCategories", chosenSubCate);
    if (values.priceAfterDiscount) {
      formData.append("priceAfterDiscount", values.priceAfterDiscount);
    }
    if (values.colors) {
      [...values.colors.split("/")].map((ele) =>
        formData.append("colors", ele)
      );
    }
    if (image2) {
      image2.map((img) => formData.append("images", img));
    }
    if (chosenBrand) {
      formData.append("brand", chosenBrand);
    }
    for (const entry of formData.entries()) {
      const [key, value] = entry;
      console.log(key, value);
    }

    await axios
      .post(`https://node-api-v1.onrender.com/api/v1/products`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);

        nav("/dashboard/products");
      })
      .catch((err) => {
        console.log(err);
        setErrCode(err.response.data.errors[0].msg);
      });
    setLoading(false);
  };

  return (
    <div className="p-8 min-h-full">
      <h2 className="font-semibold text-2xl ">Create Product</h2>
      <form action="" className="my-5" onSubmit={(e) => createBrand(e)}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        {/* Cate*/}
        <div>
          <label className="block my-4">Category :</label>
          <select
            required
            className=" block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => {
              setChosenCate(e.target.value);
            }}
          >
            <option value="" disabled selected>
              Chose
            </option>

            {cate.map((cate) => (
              <option key={cate._id} value={cate._id}>
                {cate.name}
              </option>
            ))}
          </select>
        </div>
        {/* SubCate*/}
        <div>
          <label className="block my-4">SubCategory :</label>
          <select
            required
            className=" block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => {
              setChosenSubCate(e.target.value);
            }}
          >
            <option value="" disabled selected>
              Chose
            </option>
            {subCate.map((cate) => (
              <option
                key={cate._id}
                value={cate._id}
                className="my-2 aria-selected:bg-dark aria-selected:text-gold"
              >
                {cate.name}
              </option>
            ))}
          </select>
        </div>
        {/* Brand*/}
        <div>
          <label className="block my-4">Brand :</label>
          <select
            className=" block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
            onChange={(e) => {
              setChosenBrand(e.target.value);
            }}
          >
            <option value="" disabled selected>
              Chose
            </option>
            {brand.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        {/* Image  */}
        <div>
          <label className="block my-4">ImageCover :</label>
          <div className=" flex gap-10 items-center">
            <input
              type="file"
              placeholder="Brand name"
              multiple
              required
              className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
              onChange={(e) => {
                {
                  setImage(e.target.files.item(0));
                }
              }}
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
        {/* Image  */}
        <div>
          <label className="block my-4">Images Cover :</label>
          <div className=" flex gap-10 items-center">
            <input
              type="file"
              placeholder="Brand name"
              multiple
              className="placeholder:text-gray-500 block border w-1/2 py-3 px-4 rounded-xl shadow-lg"
              onChange={(e) => {
                setImage2([...e.target.files]);
              }}
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
            <>Create</>
          )}
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
