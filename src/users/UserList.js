/**
 * Admin's list of all users with edit/delete brewery option
 * access from admin dashboard
 * url: /users
 */

import React, { useState, useEffect } from "react";

import LoadingSpinner from "../common/LoadingSpinner";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "../CSS/UserList.css";

const UserList = () => {
  const [users, setUsers] = useState();
  const { auth } = useAuth();

  const navigate = useNavigate();
  console.log("From UserList---------------------------------------------");
  console.log("auth::::::::::::::::::::::::::: ", auth);
  console.log("-------------------------------------------------------------");
  const END_POINT = `/users`;
  const TOKEN = auth.token;
  console.log("END_POINT:::::::::::::", END_POINT);

  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(END_POINT, config);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log("Users:::::::::::::::::::------------------", users);

  return (
    <>
      <h3 className="UserList-title title mt-2">All users</h3>

      <div className="UserList-container container" id="table-container">
        <div className="d-flex justify-content-end m-2">
          <Link to="/users/new" className="btn btn-success btn-sm mt-2">
            + Add User
          </Link>
        </div>
        {users ? (
          <table className="UserList-list-group table table-sm table-striped table-hover ">
            <thead>
              <tr>
                <th>Id</th>
                <th data-align="left">Username</th>
                <th data-align="left">First Name</th>
                <th data-align="left" data-formatter="shortingText">
                  Last Name
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.firstName.slice(0, 15)}</td>
                  <td>{u.lastName.slice(0, 15)}</td>
                  <td>
                    <button
                      className="badge bg-secondary"
                      onClick={() => navigate(`/users/${u.id}`)}
                    >
                      View
                    </button>
                    <button
                      className="badge bg-success "
                      onClick={() => navigate(`/users/${u.id}/update`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          //   "Loading..."
          <LoadingSpinner />
        )}
      </div>
    </>
  );
};

export default UserList;
