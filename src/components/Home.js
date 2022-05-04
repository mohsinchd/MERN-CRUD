import React, { useState, useEffect } from "react";
import { FaRegEye, FaPen, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Home = () => {
  const [userData, setUserData] = useState([]);
  const getUser = async (e) => {
    const response = await fetch("/getData", {
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

  const deleteUser = async (id) => {
    const response = await fetch(`/deleteUser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      },
    });

    const data = await response.json();
    setUserData(
      userData.filter((item) => {
        return item._id !== data._id;
      })
    );
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-5">
          <NavLink to="/register" className="btn btn-primary">
            Add Data
          </NavLink>
        </div>

        <table class="table mt-3">
          <thead>
            <tr className="table-dark">
              <th scope="col">Id</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Job</th>
              <th scope="col">Number</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            {userData.map((element, index) => {
              return (
                <tr key={element._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>{element.work}</td>
                  <td>{element.mobile}</td>
                  <td className="d-flex justify-content-between">
                    <NavLink
                      to={`/view/${element._id}`}
                      className="btn btn-success"
                    >
                      <FaRegEye size={30} />
                    </NavLink>
                    <NavLink
                      to={`/edit/${element._id}`}
                      className="btn btn-primary"
                    >
                      <FaPen size={30} />
                    </NavLink>
                    <button
                      onClick={() => deleteUser(element._id)}
                      className="btn btn-danger"
                    >
                      <FaTrash size={30} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {userData.length === 0 && (
          <h1 className="text-center">No Data Added.</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
