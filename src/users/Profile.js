import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import LoadingSpinner from "../common/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import "../CSS/Profile.css";

const Profile = () => {
  const { auth } = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();

  console.log("Profile", "userId = ", userId);

  const [user, setUser] = useState(null);
  const END_POINT = `users/${userId}`;

  console.log("END_POINT::::::::", END_POINT);

  const TOKEN = auth.token;
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(END_POINT, config);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserById();
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm(`Do you want to delete user with id ${id}?`);
    if (confirm) {
      axios
        .delete(END_POINT, config)
        .then((res) => {
          navigate("/users");
        })
        .catch((err) => console.log(err));
    }
  };
  if (!user) return <LoadingSpinner />;

  return (
    <>
      <div className="Profile-card card mb-3">
        <div className="row g-0">
          <div className="card-body">
            <h5 className="card-title">Profile</h5>
            <ul className="Profile-list-group list-group list-group-flush ">
              <li className="list-group-item">
                <b>First Name: </b>
                {user?.firstName}
              </li>
              <li className="list-group-item">
                <b>Last Name:</b> {user?.lastName}
              </li>
              <li className="list-group-item">
                <b>Username:</b> {user?.username}
              </li>
              <li className="list-group-item">
                <b>E-mail:</b> {user?.email}
              </li>
              <li className="list-group-item">
                <b>Location:</b> {user?.location}
              </li>
              <li className="list-group-item">
                <b>{user?.isAdmin ? "Admin" : ""}</b>
              </li>
            </ul>
            <button
              className="Profile-btn btn btn-success btn-sm me-4"
              onClick={() => navigate(`/users/${user?.id}/update`)}
            >
              Edit
            </button>
            {auth?.user?.is_admin && (
              <button
                className="Profile-btn btn btn-danger btn-sm me-4"
                onClick={(e) => handleDelete(user?.id)}
              >
                Delete
              </button>
            )}

            <button
              className="Profile-btn btn btn-primary btn-sm me-4"
              onClick={() => navigate(`/users/${user?.id}/breweries`)}
            >
              Breweries
            </button>
            {auth?.user?.is_admin && (
              <button
                className="Profile-btn btn btn-secondary btn-sm me-4"
                onClick={() => navigate("/users")}
              >
                All Users
              </button>
            )}
            <button
              className="Profile-btn btn btn-secondary btn-sm me-4"
              onClick={() => navigate(`/user`)}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
