import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
const Edit = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    work: "",
    mobile: "",
    address: "",
    description: "",
    age: "",
  });

  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const getUser = async (e) => {
    const response = await fetch(`/singleUser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    if (response.status === 422 || !data) {
      alert("Error");
    } else {
      setUserData(data);
      setInputValue(data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const setValue = (e) => {
    const { name, value } = e.target;

    setInputValue((previousValue) => {
      return {
        ...previousValue,
        [name]: value,
      };
    });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const { name, email, age, mobile, work, address, description } = inputValue;
    const response = await fetch(`/updateUser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        name,
        email,
        work,
        mobile,
        address,
        description,
        age,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (response.status === 422 || !data) {
      alert("Error");
    } else {
      alert("Data is successfully Added!");
    }
  };

  return (
    <div className="container mt-5">
      <NavLink className="btn btn-primary" to="/">
        Go Back to Home
      </NavLink>
      <form className="mt-3">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                onChange={setValue}
                value={inputValue.name}
                name="name"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name">Email</label>
              <input
                type="email"
                name="email"
                onChange={setValue}
                value={inputValue.email}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group">
              <label htmlFor="name">Mobile</label>
              <input
                type="number"
                name="mobile"
                onChange={setValue}
                value={inputValue.mobile}
                className="form-control"
              />
            </div>
          </div>

          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group">
              <label htmlFor="name">Age</label>
              <input
                type="number"
                name="age"
                onChange={setValue}
                value={inputValue.age}
                className="form-control"
              />
            </div>
          </div>

          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group">
              <label htmlFor="name">Work</label>
              <input
                type="text"
                onChange={setValue}
                value={inputValue.work}
                name="work"
                className="form-control"
              />
            </div>
          </div>

          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group">
              <label htmlFor="name">Address</label>
              <input
                type="text"
                name="address"
                onChange={setValue}
                value={inputValue.address}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              name="description"
              onChange={setValue}
              value={inputValue.description}
              rows="10"
            ></textarea>
          </div>
        </div>

        <button
          onClick={updateUser}
          type="submit"
          className="btn btn-primary mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Edit;
