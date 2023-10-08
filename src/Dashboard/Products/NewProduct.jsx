import { useEffect, useState } from "react";
import logo from "../../images/no-image-icon-0.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import React from "react";
import FormInput from "../../Components/FormInput";
import { apiRoute } from "../../App";
function NewProduct() {
  const [errCode, setErrCode] = useState([]);
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState([]);

  const [cate, setCate] = useState([]);
  const [chosenCate, setChosenCate] = useState("");

  const [subCate, setSubCate] = useState([]);
  const [chosenSubCate, setChosenSubCate] = useState("");

  const [brand, setBrand] = useState([]);
  const [chosenBrand, setChosenBrand] = useState("");

  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  let token = localStorage.getItem("token");

  // get cate
  useEffect(() => {
    axios
      .get(`${apiRoute}/api/v1/categories`)
      .then((res) => {
        setCate(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (chosenCate) {
      axios
        .get(`${apiRoute}/api/v1/categories/${chosenCate}/subCategories`)
        .then((res) => {
          setSubCate(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [chosenCate]);
  useEffect(() => {
    axios
      .get(`${apiRoute}/api/v1/brands`)
      .then((res) => {
        setBrand(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [values, setValues] = useState({
    title_ar: "",
    title_en: "",
    description_ar: "",
    description_en: "",
    shortDescription_ar: "",
    shortDescription_en: "",
    highlights_ar: "",
    highlights_en: "",
    quantity: "",
    price: "",
    priceAfterDiscount: "",
    colors: "",
    size_EU: "",
    size_UK: "",
    size_US: "",
    size_Japan: "",
    size_ChinaTops: "",
    size_ChinaButtoms: "",
    size_korea: "",
    size_Mexico: "",
    size_Brazil: "",
    size_CM: "",
    size_In: "",
    size_italy: "",
    size_france: "",
    sizes: "",
  });

  const inputs = [
    {
      id: 1,
      name: "title_ar",
      type: "text",
      placeholder: "product name ar",
      errorMessage: "Product Name should be more than 3 characters",
      pattern: "{3,}$",
      label: "Product Name Ar :",
      minLength: 3,
      required: true,
    },
    {
      id: 2,
      name: "title_en",
      type: "text",
      placeholder: "product name en",
      errorMessage: "Product Name should be more than 3 characters",
      pattern: "{3,}$",
      minLength: 3,
      label: "Product Name En :",
      required: true,
    },
    {
      id: 3,
      name: "description_ar",
      type: "text",
      placeholder: "Description Ar",
      errorMessage: "Description should be more than 16 characters",
      pattern: "{16,}$",
      minLength: 20,
      label: "Description Ar:",
      required: true,
    },
    {
      id: 4,
      name: "description_en",
      type: "text",
      placeholder: "Description En",
      errorMessage: "Description should be more than 16 characters",
      pattern: "{16,}$",
      minLength: 20,
      label: "Description En:",
      required: true,
    },
    {
      id: 5,
      name: "shortDescription_ar",
      minLength: 20,
      type: "text",
      placeholder: " Description En",
      errorMessage: "Description should be more than 16 characters",
      pattern: "{16,}$",
      label: "Short Description Ar:",
      required: true,
    },
    {
      id: 6,
      name: "shortDescription_en",
      minLength: 20,
      type: "text",
      placeholder: "Description En",
      errorMessage: "Description should be more than 16 characters",
      pattern: "{16,}$",
      label: "Short Description En:",
      required: true,
    },
    {
      id: 7,
      name: "highlights_ar",
      type: "text",
      placeholder: "highlight1 / highlight2",
      errorMessage: "Description should be more than 16 characters",
      pattern: "{16,}$",
      label: "Highlights Ar:",
    },
    {
      id: 8,
      name: "highlights_en",
      type: "text",
      placeholder: "highlight1 / highlight2",
      errorMessage: "Description should be more than 16 characters",
      pattern: "{16,}$",
      label: "Highlights En:",
    },
    {
      id: 9,
      name: "quantity",
      type: "number",
      placeholder: "Quantity",
      errorMessage: "Quantity must be more than 5",
      label: "Quantity :",
      min: 5,
      required: true,
    },

    {
      id: 11,
      name: "price",
      type: "number",
      placeholder: "Price",
      errorMessage: "Price must be more than 10",
      label: "Price :",
      min: 10,
      required: true,
    },
    {
      id: 12,
      name: "priceAfterDiscount",
      type: "number",
      placeholder: "Price After Discount",
      errorMessage: "Price After Discount must be less than Price",
      label: "Price After Discount :",
      max: values.price - 1,
    },
    {
      id: 13,
      name: "colors",
      type: "type",
      placeholder: "color1 / color2",
      label: "Colors: ",
    },
    {
      id: 14,
      name: "sizes",
      type: "type",
      placeholder: "size1 / size2",
      label: "sizes: ",
    },
    {
      id: 14,
      name: "size_france",
      type: "type",
      placeholder: "size1 / size2",
      label: "size_france: ",
    },
    {
      id: 14,
      name: "size_italy",
      type: "type",
      placeholder: "size1 / size2",
      label: "size_italy: ",
    },
    {
      id: 14,
      name: "size_EU",
      type: "type",
      placeholder: "size1 / size2",
      label: "size_EU: ",
    },
    {
      id: 14,
      name: "size_UK",
      type: "type",
      placeholder: "size1 / size2",
      label: "size_UK: ",
    },
    {
      id: 14,
      name: "size_US",
      type: "type",
      placeholder: "size1 / size2",
      label: "size_US: ",
    },
    {
      id: 14,
      name: "size_Japan",
      type: "type",
      placeholder: "size1 / size2",
      label: "size_Japan: ",
    },
    {
      id: 14,
      name: "size_ChinaTops",
      type: "type",
      placeholder: "size1 / size2",
      label: "size_ChinaTops: ",
    },
    {
      id: 14,
      name: "size_ChinaButtoms",
      type: "type",
      placeholder: "size1 / size2",
      label: "size_ChinaButtoms: ",
    },
    {
      id: 14,
      name: "size_korea",
      type: "type",
      placeholder: "size1 / size2",
      label: "size_korea: ",
    },
    {
      id: 14,
      name: "size_Mexico",
      type: "type",
      placeholder: "size1 / size2",
      label: "size_Mexico: ",
    },
    {
      id: 14,
      name: "size_Brazil",
      type: "type",
      placeholder: "size1 / size2",
      label: "size_Brazil: ",
    },
    {
      id: 14,
      name: "size_CM",
      type: "type",
      placeholder: "size1 / size2",
      label: "size_CM: ",
    },
    {
      id: 14,
      name: "size_In",
      type: "type",
      placeholder: "size1 / size2",
      label: "size_In: ",
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  let createBrand = async function (e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title_en", values.title_en);

    formData.append("title_ar", values.title_ar);
    formData.append("description_ar", values.description_ar);
    formData.append("description_en", values.description_en);
    formData.append("shortDescription_ar", values.shortDescription_ar);
    formData.append("shortDescription_en", values.shortDescription_en);
    formData.append("quantity", values.quantity);
    formData.append("price", values.price);
    formData.append("imageCover", image);
    formData.append("category", chosenCate);

    if (chosenSubCate) {
      formData.append("subCategories", chosenSubCate);
    }
    if (values.priceAfterDiscount) {
      formData.append("priceAfterDiscount", values.priceAfterDiscount);
    }
    if (values.colors) {
      [...values.colors.split("/")].map((ele) =>
        formData.append("colors", ele)
      );
    }
    if (values.highlights_ar) {
      [...values.highlights_ar.split("/")].map((ele) =>
        formData.append("highlights_ar", ele)
      );
    }
    if (values.highlights_en) {
      [...values.highlights_en.split("/")].map((ele) =>
        formData.append("highlights_en", ele)
      );
    }
    if (values.size_EU) {
      [...values.size_EU.split("/")].map((ele) =>
        formData.append("size_EU", ele)
      );
    }
    if (values.size_UK) {
      [...values.size_UK.split("/")].map((ele) =>
        formData.append("size_UK", ele)
      );
    }
    if (values.size_US) {
      [...values.size_US.split("/")].map((ele) =>
        formData.append("size_US", ele)
      );
    }
    if (values.sizes) {
      [...values.sizes.split("/")].map((ele) => formData.append("sizes", ele));
    }
    if (values.size_Japan) {
      [...values.size_Japan.split("/")].map((ele) =>
        formData.append("size_Japan", ele)
      );
    }
    if (values.size_ChinaTops) {
      [...values.size_ChinaTops.split("/")].map((ele) =>
        formData.append("size_ChinaTops", ele)
      );
    }
    if (values.size_france) {
      [...values.size_france.split("/")].map((ele) =>
        formData.append("size_france", ele)
      );
    }
    if (values.size_italy) {
      [...values.size_italy.split("/")].map((ele) =>
        formData.append("size_italy", ele)
      );
    }
    if (values.size_ChinaButtoms) {
      [...values.size_ChinaButtoms.split("/")].map((ele) =>
        formData.append("size_ChinaButtoms", ele)
      );
    }
    if (values.size_korea) {
      [...values.size_korea.split("/")].map((ele) =>
        formData.append("size_korea", ele)
      );
    }
    if (values.size_Mexico) {
      [...values.size_Mexico.split("/")].map((ele) =>
        formData.append("size_Mexico", ele)
      );
    }
    if (values.size_Brazil) {
      [...values.size_Brazil.split("/")].map((ele) =>
        formData.append("size_Brazil", ele)
      );
    }
    if (values.size_CM) {
      [...values.size_CM.split("/")].map((ele) =>
        formData.append("size_CM", ele)
      );
    }
    if (values.size_In) {
      [...values.size_In.split("/")].map((ele) =>
        formData.append("size_In", ele)
      );
    }

    if (image2) {
      image2.map((img) => formData.append("images", img));
    }
    if (chosenBrand) {
      formData.append("brand", chosenBrand);
    }
    await axios
      .post(`${apiRoute}/api/v1/products`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        nav("/dashboard/products");
      })
      .catch((err) => {
        setErrCode(err.response.data.errors);
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
                {cate.name_en}-{cate.name_ar}
              </option>
            ))}
          </select>
        </div>
        {/* SubCate*/}
        <div>
          <label className="block my-4">SubCategory :</label>
          <select
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
                {cate.name_en}-{cate.name_ar}
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
                {brand.name_en}-{brand.name_ar}
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
            {image && (
              <img
                src={URL.createObjectURL(image)}
                className="w-32 h-32 block object-contain"
                alt=""
              />
            )}
            {!image && <div className="w-32 h-32 bg-gray-600"></div>}
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
            {image2?.length !== 0 &&
              image2?.map((e, ind) => (
                <img
                  key={ind}
                  src={URL.createObjectURL(e)}
                  className="w-32 h-32 block object-contain"
                  alt=""
                />
              ))}

            {image2.length === 0 && (
              <div className="w-32 h-32 bg-gray-600"></div>
            )}
          </div>
        </div>

        {errCode?.length !== 0 &&
          errCode?.map((err, ind) => (
            <p key={ind} className="text-red-500 my-2">
              {err.msg}
            </p>
          ))}
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
