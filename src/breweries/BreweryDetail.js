import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import LoadingSpinner from "../common/LoadingSpinner";
import "../CSS/BreweryDetail.css";

/** Brewery detail paige */

const BreweryDetail = () => {
  const navigate = useNavigate();
  const { breweryId } = useParams();
  const { auth } = useAuth();
  const userId = auth?.user.id;
  console.debug("BreweryDetail", "breweryId = ", breweryId);

  const [brewery, setBrewery] = useState(null);
  const END_POINT = `/breweries/${breweryId}`;
  console.debug("END_POINT::::::::", END_POINT);

  const TOKEN = auth?.token;
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  useEffect(() => {
    const getBrewery = async () => {
      try {
        const response = await axios.get(END_POINT);
        setBrewery(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    getBrewery();
  }, []);

  console.log("Brewery:::::::::::::::::::------------------", brewery);

  const handleDelete = (id) => {
    const confirm = window.confirm(
      `Do you want to delete brewery with id ${id}?`
    );
    if (confirm) {
      axios
        .delete(END_POINT, config)
        .then((res) => {
          navigate(
            auth?.user?.is_admin ? "/breweries" : `/users/${userId}/breweries`
          );
        })
        .catch((err) => console.log(err));
    }
  };

  if (!brewery) return <LoadingSpinner />;

  return (
    <>
      <div className="BreweryDetail-card card mb-3">
        <div className="BreweryDetail-row row g-0">
          <div className="card-body">
            <h5 className="card-title">Brewery Details</h5>
            <ul className="BreweryDetail-list-group list-group list-group-flush ">
              <li className="list-group-item">
                <b>Name: </b>
                {brewery?.name}
              </li>
              <li className="list-group-item">
                <b>Location:</b> {brewery?.location}
              </li>
            </ul>
            <button
              className="BreweryDetail-edit-btn btn btn-success btn-sm me-4"
              onClick={() => navigate(`/breweries/${breweryId}/update`)}
            >
              Edit
            </button>
            <button
              className="BreweryDetail-delete-btn btn btn-danger btn-sm me-4"
              onClick={(e) => handleDelete(breweryId)}
            >
              Delete
            </button>

            <Link
              to={
                auth.user.is_admin ? "/breweries" : `/users/${userId}/breweries`
              }
              className="BreweryDetail-back-btn btn btn-secondary btn-sm me-4"
            >
              Back to breweries
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreweryDetail;
