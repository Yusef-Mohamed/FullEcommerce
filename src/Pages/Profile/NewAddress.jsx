import React, { useState } from "react";
import FormInput from "../../Components/FormInput";
import axios from "axios";
import Cookies from "universal-cookie";

function NewAddress({ setRfresh }) {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const [errrr, setErrrr] = useState("");
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    alias: "",
    details: "",
    phone: "",
    city: "",
    postalCode: "",
  });
  const inputs = [
    {
      id: 1,
      name: "alias",
      type: "text",
      placeholder: "Name",
      errorMessage:
        "Name should be 3-16 characters and shouldn't include any special character!",
      label: "Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
      data: values.name,
    },
    {
      id: 2,
      name: "details",
      type: "text",
      placeholder: "Details",
      errorMessage: "Details Must be more than 10 Letters",
      label: "Details",
      min: 10,
      required: true,
      data: values.details,
    },
    {
      id: 3,
      name: "phone",
      type: "number",
      placeholder: "Phone",
      errorMessage: "Phone Must be more than 10 numbers",
      min: 10,
      label: "Phone",
      required: true,
      data: values.phone,
    },
    {
      id: 4,
      name: "city",
      type: "text",
      placeholder: "City",
      label: "City ",
      required: true,
      data: values.city,
    },
    {
      id: 5,
      name: "postalCode",
      type: "text",
      placeholder: "Postal Code",
      label: "Postal Code",
      required: true,
      data: values.postalCode,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "https://node-api-v1.onrender.com/api/v1/addresses",
        {
          alias: values.alias,
          details: values.details,
          phone: values.phone,
          city: values.city,
          postalCode: values.postalCode,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setValues({
          alias: "",
          details: "",
          phone: "",
          city: "",
          postalCode: "",
        });
        setRfresh((prev) => prev + 1);
      })
      .catch((err) => {
        // if (err.response.data.errors[0].msg) {
        //   setErrrr(err.response.data.errors[0].msg);
        // }
        console.log(err);
      })
      .finally(() => setLoading(false));
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="bg-white mx-auto container rounded-lg p-4 my-4"
    >
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={onChange}
        />
      ))}
      <p className="text-danger-600 my-3">{errrr && errrr}</p>
      <button className="btn py-2 bg-gold text-dark w-1/2 mx-auto block my-4">
        {loading ? (
          <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
        ) : (
          <>Submit</>
        )}
      </button>
    </form>
  );
}

export default NewAddress;
