/**
 * Admin's list of all breweries with edit/delete brewery option
 * access from admin dashboard
 * url: /breweries
 */

import React, { useState, useEffect } from "react";

import LoadingSpinner from "../common/LoadingSpinner";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../CSS/BreweriesList.css";

const BrweriesList = () => {
  const [breweries, setBreweries] = useState();
  const { auth } = useAuth();
  const navigate = useNavigate();
  // console.log(
  //   "From BreweriesList---------------------------------------------"
  // );
  // console.log("auth::::::::::::::::::::::::::: ", auth);
  // console.log("-------------------------------------------------------------");
  const END_POINT = `/breweries`;
  const TOKEN = auth?.token;
  // console.log(END_POINT);

  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(END_POINT, config);
        setBreweries(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [auth]);

  // console.log("Breweries:::::::::::::::::::------------------", breweries);

  // const handleDelete = (e) => {
  //   console.log("You are deleting brewery");
  //   console.log(e);
  //   console.log(e.target.parentElement);
  //   console.log(e.target.parentElement.id);
  // };

  return (
    <>
      <h3 className="BreweriesList-title title mt-2">All Breweries</h3>

      <div className="BreweriesList-container container" id="table-container">
        {/* <div className="d-flex justify-content-end m-2">
          <Link to="/breweries/new" className="btn btn-success btn-sm mt-2">
            + Add Brewery
          </Link>
        </div> */}
        {breweries ? (
          <table className="BreweriesList-list-group table table-striped table-hover ">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Location</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {breweries.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.name}</td>
                  <td>{b.location}</td>

                  <td>
                    <button
                      className="badge bg-info"
                      onClick={() => navigate(`/breweries/${b.id}`)}
                    >
                      View
                    </button>
                    <button
                      className="badge bg-success"
                      onClick={() => navigate(`/breweries/${b.id}/update`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  );
};

export default BrweriesList;
