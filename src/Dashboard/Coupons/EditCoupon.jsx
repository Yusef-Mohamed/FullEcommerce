import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";

import FormInput from "../../Components/FormInput";
import { apiRoute } from "../../App";
function EditCoupon() {
  const id = useParams().id;

  const [errCode, setErrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  let token = localStorage.getItem("token");

  const [values, setValues] = useState({
    name: "",
    date: "",
    discount: "",
  });
  useEffect(() => {
    axios
      .get(`${apiRoute}/api/v1/coupons//${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        setValues({
          name: res.data.data.name,
          date: res.data.data.expire.split("T")[0],
          discount: res.data.data.discount,
        });
      });
  }, []);
  // setValues({ ...values, [e.target.name]: e.target.value });
  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage: "name should be 3-16 characters ",
      pattern: "{3,16}$",
      label: "Name",
      required: true,
      data: values.name,
    },
    {
      id: 2,
      name: "discount",
      type: "number",
      placeholder: "Discount",
      errorMessage: "Discount should be more than 0 and less than 90 ",
      min: 0,
      max: 90,
      pattern: "{3,16}$",
      label: "Discount",
      required: true,
      data: values.discount,
    },

    {
      id: 3,
      name: "date",
      type: "date",
      placeholder: "Date",
      errorMessage: "It should be a valid date address!",
      label: "Date",
      required: true,
      min: new Date().toISOString().split("T")[0],
      data: values.date,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  let EditCoupon = async function (e) {
    e.preventDefault();
    setLoading(true);
    await axios
      .put(
        `${apiRoute}/api/v1/coupons/${id}`,
        { discount: values.discount, name: values.name, expire: values.date },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        nav("/dashboard/coupon");
      })
      .catch((err) => {
        console.log(err);
        setErrCode(err.response.data.errors[0].msg);
      });
    setLoading(false);
  };

  return (
    <div className="p-8 min-h-full">
      <h2 className="font-semibold text-2xl ">Edit Coupon</h2>
      <form action="" className="my-5" onSubmit={(e) => EditCoupon(e)}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        {errCode !== "" && <p className="text-red-500 my-2">{errCode}</p>}
        <button
          type="submit"
          className="btn text-gold bg-dark px-10 p-2 mx-auto my-5"
        >
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
          ) : (
            <>Edit</>
          )}
        </button>
      </form>
    </div>
  );
}

export default EditCoupon;
