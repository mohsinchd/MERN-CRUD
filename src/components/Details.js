import React, { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useParams } from "react-router-dom";
const Details = () => {
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
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container mt-3">
      <h1>Welcome {userData.name}</h1>
      <div className="card w-50 mt-3 p-3">
        <div className="d-flex justify-content-between align-items-center">
          <CgProfile size={80} />
        </div>

        <div className="row">
          <div className="col-6">
            <h3>Name:</h3>
            <span>{userData.name}</span>
            <h3>Age:</h3>
            <span>{userData.age}</span>
            <h3>Occupation:</h3>
            <span>{userData.work}</span>
            <h3>Email: </h3>
            <span>{userData.email}</span>
          </div>
          <div className="col-6">
            <h3>Mobile:</h3>
            <span>{userData.mobile}</span>
            <h3>Location:</h3>
            <span>{userData.address}</span>
            <h3>Description:</h3>
            <span>{userData.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
